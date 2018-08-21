from django.contrib import admin
from .models import Session, Available, Sentence, AudioFile, Profile

admin.site.register( Session )
admin.site.register( Available )
admin.site.register( Sentence )
admin.site.register( AudioFile )
admin.site.register( Profile )
