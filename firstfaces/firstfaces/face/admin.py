from django.contrib import admin
from .models import Conversation, Available, Sentence, AudioFile, Profile, AudioError, AudioErrorAttempt, AudioErrorCorrectionAttempt, StockPhrases, StockPhrases, Prompt0, Prompt1, Prompt2

admin.site.register( Conversation )
admin.site.register( Available )
admin.site.register( Sentence )
admin.site.register( AudioFile )
admin.site.register( Profile )
admin.site.register( AudioError )
admin.site.register( AudioErrorAttempt )
admin.site.register( AudioErrorCorrectionAttempt )
admin.site.register( Prompt0 )
admin.site.register( Prompt1 )
admin.site.register( Prompt2 )
admin.site.register( StockPhrases )
