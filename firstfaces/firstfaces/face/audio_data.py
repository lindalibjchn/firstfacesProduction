from collections import defaultdict, OrderedDict
from face.models import PermSentence, PermAudioFile
import datetime

sents = PermSentence.objects.filter(sentence_timestamp__gte=datetime.date(2019, 3, 1)).order_by('pk')
audio_per_sent_count_dict = defaultdict(int)
final_audio_same_sent_count_dict = defaultdict(int)

with open('audio_transcriptions.csv', 'a') as f:
    f.write('ERLE audio:' + ',' + str(datetime.datetime.now()) + '\n')
    big_data_string = ''
    for s in sents:
        audio_per_sent_count_dict[-1] += 1
        audiofile_set = s.permaudiofile_set.all().filter(sentence__learner__groups__name="FengChia").exclude(transcription0="")
        len_a = len(audiofile_set)
        if len_a > 0:
            audio_per_sent_count_dict[len_a] += 1
            final_audio_good = False
            if len_a > 1:
                if audiofile_set[len_a-1].transcription0 == s.sentence[1:-1]:
                    final_audio_same_sent_count_dict[len_a] += 1
                    final_audio_good = True
            elif len_a == 1:
                if audiofile_set[0].transcription0 == s.sentence[1:-1]:
                    final_audio_same_sent_count_dict[len_a] += 1
                    final_audio_good = True
            for a in audiofile_set:
                audio_per_sent_count_dict[-1] += 1
                print(str(s.learner.username) + ', ' + str(s.session.start_time).split()[0] + ', ' + str(a.id) + ', ' + str(a.transcription0) + ', ' + str(s.id) + ', ' + s.sentence[1:-1] )
                sent = s.sentence[1:-1].replace(',','')
                new_sent = sent.replace('\n', '')
                big_data_string += str(s.learner.username) + ',' + str(s.session.start_time).split()[0] + ',' + 'ASR good:' + str(final_audio_good) + '\n' + 'ASR' + ',' + str(a.id) + ',' + str(a.transcription0) + '\n' + 'sent' + ',' + str(s.id) + ',' + str(new_sent) + '\n'
        else:
            audio_per_sent_count_dict[0] += 1

    oa = OrderedDict(sorted(audio_per_sent_count_dict.items()))
    f.write('\nAudio files per sentence:' + '\n') 
    for k, v in oa.items():

        f.write(str(k) + ',' + str(v) + '\n')

    od = OrderedDict(sorted(final_audio_same_sent_count_dict.items()))
    f.write('\nFinal audio file same as sentence:' + '\n')
    for k, v in od.items():

        f.write(str(k) + ',' + str(v) + '\n')

    f.write(big_data_string)

    # if audiofile_set.exists():
        # if audiofile_set
        # print('audiofile_set:', audiofile_set, '\n')
    # else:
        # print("doesn't exist")


# print('sents[-1]', sents[900].permaudiofile_set.all())
# a = sents[902].permaudiofile_set.all()
# print('len(a)', len(a))
# print('a[0]', a[1].transcription0)



# # def get_all_audiofiles(group_name):

# #all audio with transcription not an empty string
# all_audio =  PermAudioFile.objects.all().exclude(transcription0='')
# # .exclude(transcription0=None)

# #only include those from feng Chia
# feng_chia_audio = all_audio.filter(sentence__learner__groups__name="FengChia")

# # return feng_chia_audio

# # def get_counts_per_sent( audio_querydict ):

# audio_per_sent_count_dict = {
        # 1: 0,
        # 2: 0,
        # 3: 0,
        # 4: 0,
        # 5: 0,
        # 6: 0,
        # 7: 0,
        # 8: 0,
        # 9: 0,
        # 10: 0
# }
# count = 1
# current_sent_id = feng_chia_audio[0].id
# for a in feng_chia_audio[1:]:
    # if count < 10:
        # if a.sentence.id == current_sent_id:
            # count += 1
        # else:
            # audio_per_sent_count_dict[count] += 1
            # count = 1
            # current_sent_id = a.sentence.id
    # else:
        # if a.sentence.id != current_sent_id:
            # audio_per_sent_count_dict[10] += 1
            # count = 1
            # current_sent_id = a.sentence.id


# print(audio_per_sent_count_dict)

# def runit():

# aud = get_all_audiofiles("FengChia")
# counts = get_counts_per_sent(aud)
# print('counts:', counts)

# runit()
