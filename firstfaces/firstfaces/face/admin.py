from django.contrib import admin
from .models import Conversation, Available, TempSentence, PermSentence, AudioFile, Profile, NewsArticle, PostTalkTiming, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt

admin.site.register( Conversation )
admin.site.register( Available )
admin.site.register( TempSentence )
admin.site.register( PermSentence )
admin.site.register( AudioFile )
admin.site.register( Profile )
admin.site.register( NewsArticle )
admin.site.register( PostTalkTiming )
admin.site.register( AudioError )
admin.site.register( AudioErrorAttempt )
admin.site.register( AudioErrorCorrectionAttempt )
