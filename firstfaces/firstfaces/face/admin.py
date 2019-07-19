from django.contrib import admin
from .models import Session, Available, Sentence, PermSentence, AudioFile, PermAudioFile, Profile, NewsArticle, PostTalkTimings, PermPostTalkTimings, Test, AudioErrors, AudioErrorAttempt,AudioErrorCorrectionAttempt

admin.site.register( Session )
admin.site.register( Available )
admin.site.register( Sentence )
admin.site.register( PermSentence )
admin.site.register( AudioFile )
admin.site.register( PermAudioFile )
admin.site.register( Profile )
admin.site.register( NewsArticle )
admin.site.register( PostTalkTimings )
admin.site.register( PermPostTalkTimings )
admin.site.register( Test )
admin.site.register( AudioErrors )
admin.site.register( AudioErrorAttempt )
admin.site.register( AudioErrorCorrectionAttempt )
