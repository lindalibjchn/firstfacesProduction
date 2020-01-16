from django.contrib import admin
from .models import Conversation, Available, Sentence, AudioFile, Profile, AudioError, UserProducts, AudioErrorAttempt, HairColour, AudioErrorCorrectionAttempt, StockPhrases, TiaAttributes, Prompt, Update, StockWord, BackgroundColour

admin.site.register( Conversation )
admin.site.register( Available )
admin.site.register( Sentence )
admin.site.register( AudioFile )
admin.site.register( Profile )
admin.site.register( AudioError )
admin.site.register( AudioErrorAttempt )
admin.site.register( AudioErrorCorrectionAttempt )
admin.site.register( Prompt )
admin.site.register( StockPhrases )
admin.site.register( StockWord )
admin.site.register( Update )
admin.site.register( BackgroundColour )
admin.site.register( TiaAttributes )
admin.site.register( UserProducts )
admin.site.register( HairColour )