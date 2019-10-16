from django.http import JsonResponse
from face.views.conversation.student.utils.speech_to_text import convert_mp3_to_wav, get_speech_recognition
from face.views.conversation.all.sentences import convert_django_sentence_object_to_json
from face.views.conversation.all import database_updates
from face.praat_utils import get_audio_length
from django.utils import timezone
import json
from face.models import Conversation, Sentence, AudioFile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt
from django.conf import settings
import code
import os
import time
import string
import math
import ast

def tts(request):

    print('\n\nintts\n\n')

    text = request.GET['sentence']
    tia_speaker = json.loads(request.GET['tiaSpeaker'])
    session_id = request.GET['sessionID']
    pitch_designated = float(request.GET['pitch'])
    speaking_rate_designated = float(request.GET['speaking_rate'])
    # caller = request.GET['caller']
    blob_no_text = json.loads(request.GET['blob_no_text'])
    blob_no_text_sent_id = request.GET['blob_no_text_sent_id']
    try:
        gender = request.GET['gender']
    except:
        gender = 'F'

    if tia_speaker:

        speaking_voice = 'en-GB-Wavenet-C'
    
    else:

        if gender == 'M':

            speaking_voice = 'en-GB-Wavenet-B'
    
        else:

            speaking_voice = 'en-GB-Wavenet-A'

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text=text)

    # Note: the voice can also be specified by name.  # Names of voices can be retrieved with client.list_voices().  
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='en-GB',
        name=speaking_voice
        # ssml_gender=texttospeech.enums.SsmlVoiceGender.MALE
        )

    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3,
        pitch = pitch_designated,
        speaking_rate = speaking_rate_designated,
        # volume_gain_db = 6,
        )

    try:
        response = client.synthesize_speech(input_text, voice, audio_config)

        # don't need to keep all synths for conversation. Remember to delete this when session ends.
        synthURL = 'media/synths/session' + session_id + '.wav' # + '_' + str(int(time.mktime((timezone.now()).timetuple()))) + '.wav'
        with open( os.path.join(settings.BASE_DIR, synthURL ), 'wb') as out:
            out.write(response.audio_content)
    except:
        synthURL = 'fault'

    # if they are listening to something they typed, want to keep note of it. If they listen and try to speak again, then the change in pronunciation could be useful for pronunciation training

    response_data = {

        'synthURL': synthURL,

    }

    return JsonResponse(response_data) 

def store_blob(request):
    database_updates.database_updated_by_student = True
    print('database updated by blob:', database_updates.database_updated_by_student)
    # code.interact(local=locals());

    blob = request.FILES['data']
    conv = Conversation.objects.get( pk=request.POST['conversation_id'] )
    sent_id = json.loads(request.POST['sentence_being_recorded_id'])
    print('sent_id:', sent_id)

    # if very first attempt or new sent then need to create empty sentence
    if sent_id != None:
        
        s = Sentence.objects.get( pk=sent_id )

    else:

        s = Sentence(learner=request.user, conversation=conv)
        s.save()


    filename = str(conv.id) + "_" + str(s.id) + "_" + timezone.now().strftime( '%H-%M-%S' ) + ".webm" 
    blob.name = filename

    #and then link the recording
    a = AudioFile(
            sentence=s, 
            audio=blob, 
            # interference=interference,
            )
    a.save()
    # need to save the file before can acces url to use ffmpeg (in utils.py)
    alternatives = get_speech_recognition(filename)
    audioFile = "media/wav/"+filename[:-4]+'wav'
    audioLength = get_audio_length(settings.BASE_DIR+"/"+audioFile)
    
    # print('transcription_list:', transcription_list)

    ## commented out as daniel will be doing his own thing here so wont need alignments
    # transcription_aligned_list = get_alignments(transcription_list)
    # print('transcription_aligned_list:', transcription_aligned_list)

    #and then once have the transcriptions, save them
    a.alternatives = alternatives
    a.save()

    response_data = {

        'sentence': convert_django_sentence_object_to_json(s, request.user.id, conv.id),
        'alternatives': alternatives,
        'audio_pk':a.id,
        'audio_file':audioFile,
        'audio_length':audioLength,
    
    }

    return JsonResponse(response_data)    

def store_error_blob(request):
    blob = request.FILES['data'] 
    startID = request.POST['start_idx']
    errors = json.loads(request.POST['error_list'])
    # if the audio error already exists
    if startID in errors.keys():
        primaryKey = errors[startID]
        af = AudioError.objects.get(pk=primaryKey)
    else:
        temp = AudioFile.objects.get(pk=request.POST['audio_id'])
        af = AudioError(audio=temp, start_index=startID)
        af.save()
    sess = Conversation.objects.get( pk=request.POST['sessionID'] )
    # Create new AudioErrorAttempt
    filename ="error_"+str(sess.id) + "_" + "_" + timezone.now().strftime( '%H-%M-%S' )+ ".webm"
    blob.name = filename
    
    aea = AudioErrorAttempt(
            error = af,
            audio = blob,
            correct=False,
            )
    aea.save()
    # Get transcript for recording attempt
    trans = get_speech_recognition(filename)[0]["transcript"]
    audio_url = "media/wav/"+filename[:-4]+"wav"
    audio_len = get_audio_length(settings.BASE_DIR+"/"+audio_url);
    aea.transcript = trans
    aea.save()
    response_data = {
            'error_trans':trans,
            'attempt_pk':aea.id,
            'error_pk':af.id,
            'error_start':startID,
            'audio_url':audio_url,
            'audio_len':audio_len,
    }

    return JsonResponse(response_data) 

# Function resets the current audio error and audio error attempt if the user submits the keyboard then exits before 
# submitting a correct recording of what they have typed
def close_attempt(request):
    att = request.POST['correctio_id']
    err = request.POST['error_pk']
    aeca = AudioErrorCorrectionAttempt.objects.get(pk=att)
    ae = AudioError.objects.get(pk=err)
    ae.typed = False
    ae.intention = ""
    ae.save();
    aeca = AudioErrorCorrectionAttempt.objects.get(pk = request.POST['correctio_id'])
    clicks = request.POST['clicks']
    aeca.clicks = clicks
    aeca.save()
    response_data = {

    }
    return JsonResponse(response_data) 


# Function is used if user uses only the re-recording of an error and submits the resulting transcription
def error_recording_used(request):
    att = request.POST['attempt_pk']
    err = request.POST['error_pk']
    trans = request.POST['trans']

    ae = AudioError.objects.get(pk=err)
    aea = AudioErrorAttempt.objects.get(pk=att)
    ae.typed = False
    ae.intention = trans
    ae.save()
    
    aea.correct = True
    aea.save()

    response_data = { 

    }
    return JsonResponse(response_data)

# Function does the allignment of words
def do_allignment(request):
    # gets transcript of audio file
    trans= request.POST['trans']
    audioPath = request.POST['fn']
    sid = request.POST['sessionID']
    
    # writes transcirption one word to a line to a file
    f = open(get_text_path(sid),"w+")                                               
    for word in trans.split():                                                   
        f.write(word.lower()+"\n")                                               
    f.close()                                                         
    textPath = get_text_path(sid)                                                   
    
    # Below lines do the forced allignment, commented lines are those used for Aeneas 
    # extra_str = '"task_language=eng|os_task_file_format=json|is_text_type=plain"'
    outPath = get_out_path(sid)                                                     
    #aeneasPath = get_aeneas_path()                                               
    #cwd = os.getcwd()                                                            
    #command = 'python3 -m aeneas.tools.execute_task '+ settings.BASE_DIR + '/' + audioPath+" "+textPath+" "+extra_str+" "+outPath+" >/dev/null 2>&1"   
    command = 'python3 align.py '+settings.BASE_DIR + '/'+audioPath+' '+' '+textPath+" -o "+outPath
    wd = settings.BASE_DIR+'/face/gentle-master/'
    #sub_proc = subprocess.Popen(command,cwd=get_aeneas_path(),shell=True,stdout=subprocess.PIPE, stderr=subprocess.PIPE)   
    sub_proc = subprocess.Popen(command.split(),cwd=wd)
    sub_proc.wait()                                                                          
    response_data = {                  
                                               
    }                                  
    return JsonResponse(response_data) 


# gets remaining audio of file (all non errored words)
def get_remaining_audio(request): 
    sid = request.POST['sessionID']

    #ids holds the numerical IDs of span tags holding remaining words
    ids = ast.literal_eval("["+str(request.POST['ids'])+']')

    # poss and ends hold the begining and ending indexs of the words in the transcription
    poss = ast.literal_eval("["+str(request.POST['poss'])+']')
    ends = ast.literal_eval("["+str(request.POST['ends'])+"]")
    paths = []
    lens = []
    count=0
    # Loop iterates through each word (or sequential set of words) and extracts and saves the audi relating to it
    for i in ids:
        idx = i
        pos =  poss[count]
        end =  ends[count]
        count+=1
        ts = get_timestamps(pos,end,sid)
        audioPath = request.POST['fn'];
        fn = "part_"+str(i)+"_"+timezone.now().strftime( '%H-%M-%S' )+"_aud.wav"
        errorPath = play_errored_text(audioPath,ts,fn)
        hyp_audio = ref_path(fn)
        # Saves the audio filename and audio length to lists 
        lens.append(get_audio_length(settings.BASE_DIR+'/'+hyp_audio))
        paths.append(hyp_audio)
    print("\n\n",paths)
    response_data = {                  
        "paths":paths,
        "lens":lens,
    }                                  
    return JsonResponse(response_data) 

# Function called if user submits a typed correction
def error_typing_used(request):
    startID = request.POST['start_idx']
    errors = json.loads(request.POST['error_list'])
    af = AudioFile.objects.get(pk=request.POST['audio_id'])
    session_id = request.POST['sessionID']
    #If no Audio error exists create it
    if startID in errors.keys():
        #AE exists
        primaryKey = errors[startID]
        ae = AudioError.objects.get(pk=primaryKey)
    else:
        #AE does not exist
        ae = AudioError(audio=af, start_index=startID)

    filename = af.audio.name
    trans = ast.literal_eval(af.alternatives)[0]["transcript"]
    #convert audio to wav
    audioPath = convert_audio(filename)
    #Get audio
    ERR_trans = request.POST['etrans']
    idx = int(request.POST['first_word_id'])
    endid = idx + (len(ERR_trans.strip().split(" "))-1) 
    
    ts = get_timestamps(idx,endid, session_id)
    fn = request.POST['sessionID']+"_"+timezone.now().strftime( '%H-%M-%S' )+"_error.wav"
    errorPath = play_errored_text(audioPath,ts,fn)
    
    #Synth Audio
    gender = request.POST['gender']
    if gender == 'F':
        speaking_voice = 'en-GB-Wavenet-A'
    elif gender == 'M':
        speaking_voice = 'en-GB-Wavenet-B'
    else:
        speaking_voice = 'en-GB-Wavenet-A'
    pitch_designated = float(request.POST['pitch'])
    speaking_rate_designated = float(request.POST['speaking_rate'])      

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.types.SynthesisInput(text=request.POST['trans'])
    voice = texttospeech.types.VoiceSelectionParams(language_code='en-GB',name=speaking_voice)
    audio_config = texttospeech.types.AudioConfig(audio_encoding=texttospeech.enums.AudioEncoding.LINEAR16,pitch = pitch_designated,speaking_rate = speaking_rate_designated)
    try:
        response = client.synthesize_speech(input_text, voice, audio_config)
        synthURL1 = 'media/synths/session' + session_id + '_'+ 'error' + timezone.now().strftime('%H-%M-%S') + '.mp3'
        with open( os.path.join(settings.BASE_DIR, synthURL1 ), 'wb') as out:
            out.write(response.audio_content)

        synthURL1 = convert_mp3_to_wav(synthURL1)

    except:  
        synthURL1 = 'fault'
    
    #Above code works but for development is not being utilised

    synthFN = settings.BASE_DIR + '/' + synthURL1
    #synthFN = generate_synth_audio(request.POST['trans'],fn)
    start = time.time()
    ref_image = get_spectogram(synthFN,0,"ref_"+session_id+"_"+timezone.now().strftime('%H-%M-%S')+".png",0)
    
    sim = get_sim(ERR_trans,request.POST['trans'])
    hin = "hyp_"+session_id+"_"+timezone.now().strftime('%H-%M-%S')+".png"
    
    
    hyp_image = get_spectogram(errorPath,sim,hin,1) 
    refLen = get_audio_length(synthFN)
    hypLen = get_audio_length(errorPath)
    #Error in naming convention
    hyp_audio = ref_path(fn) 
    ref_audio = get_hyp_audio_path(fn)
    
    #create empty Audio Error Correction Attempt
    ae.typed= True
    ae.intention = request.POST['trans']
    ae.save()

    aeca = AudioErrorCorrectionAttempt(error=ae)
    aeca.save();

    response_data = {
            #"ref_audio_url":ref_audio,
            "ref_audio_url":synthURL1,
            "ref_image_url":ref_image,
            "hyp_audio_url":hyp_audio,
            "hyp_image_url":hyp_image,
            "hyp_length":hypLen,
            "ref_length":refLen,
            "aeca_id":aeca.id,
            "ae_id":ae.id,
            "sim":sim,
    }
    return JsonResponse(response_data)


# Function called is user attempts to record audio after submitting typed correction
def store_attempt_blob(request):
    #translator used to remove punctuation from string
    translator = str.maketrans('', '', string.punctuation)
    
    # Takes in necessary data 
    blob = request.FILES['data']
    sess = Conversation.objects.get( pk=request.POST['sessionID'] )
    ae_pk = request.POST['error_pk']
    ae = AudioError.objects.get( pk=ae_pk )

    blob_no_text_sent_id = int(request.POST['blob_no_text_sent_id'])
    s = Sentence.objects.get( pk=blob_no_text_sent_id )
    
    # Gets existing audio correction attempt instance
    aeca = AudioErrorCorrectionAttempt.objects.get(pk = request.POST['correctio_id'])
    # Populates the ACA 
    filename = str(sess.id) + "_attempt_" + str(s.id) + "_" + timezone.now().strftime( '%H-%M-%S' ) +".webm"
    blob.name = filename 
    aeca.audio = blob;
    clicks = request.POST['clicks']
    aeca.clicks = clicks
    aeca.save();
    #Obtains transcript for audio file
    trans = get_speech_recognition(filename)[0]["transcript"]
    # removes punctuation 
    trans = trans.translate(translator)
    temp = ae.intention.translate(translator)
    aeca.transcript = trans
    aeca.save()
    # Works out phonetic similarity between typed correction and recorded transcription
    sim = get_sim(temp,trans)
    
    # Works out if transcriptions are considered same
    correct = False
    if temp.lower() == trans.lower() or sim == 0:
        trans = ae.intention
        correct = True
    audio_url = "media/wav/"+filename[:-4]+"wav"
    pic_name = "att_"+str(aeca.id)+".png" 
    pic_url = get_spectogram(settings.BASE_DIR+"/"+audio_url,sim,pic_name,1)
    lenAudio = get_audio_length(settings.BASE_DIR+"/"+audio_url)
    aeca = AudioErrorCorrectionAttempt(error=ae)
    aeca.save()        
    response_data = {
        "correct":correct,
        "audio_url":audio_url,
        "image_url":pic_url,
        "trans":trans,
        "att_id":aeca.id,
        "hypLen":lenAudio,
        "sim":sim,
    }
    return JsonResponse(response_data)
