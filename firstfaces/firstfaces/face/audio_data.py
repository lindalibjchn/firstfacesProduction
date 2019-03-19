from collections import defaultdict
from face.models import PermSentence, PermAudioFile

def get_all_audiofiles(group_name):

    #all audio with transcription not an empty string
    all_audio =  PermAudioFile.objects.all().exclude(transcription0='')
    # .exclude(transcription0=None)
    
    #only include those from feng Chia
    feng_chia_audio = all_audio.filter(sentence__learner__groups__name=group_name)

    return feng_chia_audio

def get_counts_per_sent( audio_querydict ):

    audio_per_sent_count_dict = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0
    }
    count = 1
    current_sent_id = audio_querydict[0].id
    for a in audio_querydict[1:]:
        if count < 10:
            if a.sentence.id == current_sent_id:
                count += 1
            else:
                audio_per_sent_count_dict[count] += 1
                count = 1
                current_sent_id = a.sentence.id
        else:
            if a.sentence.id != current_sent_id:
                audio_per_sent_count_dict[10] += 1
                count = 1
                current_sent_id = a.sentence.id


    return audio_per_sent_count_dict

aud = get_all_audiofiles("FengChia")
counts = get_counts_per_sent(aud)
print('counts:', counts)
