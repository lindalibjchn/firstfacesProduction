from django.contrib import admin
from .models import Session, Available, Sentence, PermSentence, AudioFile, PermAudioFile, Profile, NewsArticle, PronunciationRequest, PermPronunciationRequest

admin.site.register( Session )
admin.site.register( Available )
admin.site.register( Sentence )
admin.site.register( PermSentence )
admin.site.register( AudioFile )
admin.site.register( PermAudioFile )
admin.site.register( Profile )
admin.site.register( NewsArticle )
admin.site.register( PronunciationRequest )
admin.site.register( PermPronunciationRequest )
