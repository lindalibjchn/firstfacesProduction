from django.db import models
from django.contrib.auth.models import User, Group
from django.utils import timezone
from django.conf import settings
import json

class Session(models.Model):

    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    learner_emotion = models.CharField(max_length=12, null=True, blank=True)
    topic = models.CharField(max_length=100, null=True, blank=True)
    score = models.SmallIntegerField(null=True, blank=True)
    tutorial = models.BooleanField(default=False)
                         
    def __str__(self):
        return  str(self.pk) + "___" + self.learner.username + '___' + str(self.start_time.strftime("%a %d %b %H:%M")) + '___' + str(self.score)

class Available(models.Model):
    start_availability = models.DateTimeField()
    end_availability = models.DateTimeField()
    avail_group = models.ManyToManyField(Group, default=3)
    
    @property
    def available_now(self):
        time_now = timezone.now()
        if time_now < self.end_availability and time_now > self.start_availability:
            return True

    def __str__(self):
        return timezone.localtime(self.start_availability).strftime("%a %d %H:%M") + " -- " + timezone.localtime(self.end_availability).strftime("%H:%M")

class Sentence(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    sentence = models.CharField(max_length=300, blank=True, null=True)
    sentence_timestamp = models.DateTimeField(null=True, blank=True)
    question = models.BooleanField(default=False)

    JUDGEMENT_CHOICES = (
        ('C', 'correct'),
        ('P', 'prompt'),
        ('B', 'better'),
        ('M', 'mean_by'),
        ('I', 'incorrect'),
        ('D', 'dunno'),
        ('3', 'more_than_three')
    )

    judgement = models.CharField(max_length=1, choices=JUDGEMENT_CHOICES, null=True, blank=True)
    judgement_timestamp = models.DateTimeField(null=True, blank=True)
    emotion = models.CharField(max_length=12, default="[0, 0]")
    # True is nod. False is shake and null is nothing
    nod = models.NullBooleanField(null=True)
    nodSpeed = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    nodAmount = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    surprise = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    indexes = models.CharField(max_length=30, null=True, blank=True)
    indexes_timestamp = models.DateTimeField(null=True, blank=True)
    correction = models.CharField(max_length=300, blank=True)
    correction_timestamp = models.DateTimeField(null=True, blank=True)
    #this was for checking if correction has come in previous version. could be removed if not needed later
    whats_wrong = models.NullBooleanField(null=True)
    whats_wrong_timestamp = models.DateTimeField(null=True, blank=True)
    try_again = models.NullBooleanField(null=True)
    try_again_timestamp = models.DateTimeField(null=True, blank=True)
    show_correction = models.NullBooleanField(null=True)
    show_correction_timestamp = models.DateTimeField(null=True, blank=True)
    next_sentence = models.NullBooleanField(null=True)
    next_sentence_timestamp = models.DateTimeField(null=True, blank=True)
    #if native wants to say something in speech bubble
    prompt = models.CharField(max_length=300, null=True, blank=True, default=None)
    prompt_timestamp = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return  str(self.pk) + ": " + str(self.sentence)

class PermSentence(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    sentence = models.CharField(max_length=300, blank=True, null=True)
    sentence_timestamp = models.DateTimeField(null=True, blank=True)
    question = models.BooleanField(default=False)

    JUDGEMENT_CHOICES = (
        ('C', 'correct'),
        ('B', 'better'),
        ('P', 'prompt'),
        ('M', 'mean_by'),
        ('I', 'incorrect'),
        ('D', 'dunno'),
        ('3', 'more_than_three')
    )

    judgement = models.CharField(max_length=1, choices=JUDGEMENT_CHOICES, null=True, blank=True)
    judgement_timestamp = models.DateTimeField(null=True, blank=True)
    emotion = models.CharField(max_length=12, default="[0, 0]")
    # True is nod. False is shake and null is nothing
    nod = models.NullBooleanField(null=True)
    nodSpeed = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    nodAmount = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    surprise = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    indexes = models.CharField(max_length=30, null=True, blank=True)
    indexes_timestamp = models.DateTimeField(null=True, blank=True)
    correction = models.CharField(max_length=300, blank=True)
    correction_timestamp = models.DateTimeField(null=True, blank=True)
    #this was for checking if correction has come in previous version. could be removed if not needed later
    whats_wrong = models.NullBooleanField(null=True)
    whats_wrong_timestamp = models.DateTimeField(null=True, blank=True)
    try_again = models.NullBooleanField(null=True)
    try_again_timestamp = models.DateTimeField(null=True, blank=True)
    show_correction = models.NullBooleanField(null=True)
    show_correction_timestamp = models.DateTimeField(null=True, blank=True)
    next_sentence = models.NullBooleanField(null=True)
    next_sentence_timestamp = models.DateTimeField(null=True, blank=True)
    #if native wants to say something in speech bubble
    prompt = models.CharField(max_length=300, null=True, blank=True, default=None)
    prompt_timestamp = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return  str(self.pk) + ": " + str(self.sentence)

# may need multiple audio files per sentence as student attempts and re-attempts
class AudioFile(models.Model):
    sentence = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    transcription0 = models.CharField(max_length=300, blank=True, null=True)
    transcription1 = models.CharField(max_length=300, blank=True, null=True)
    transcription2 = models.CharField(max_length=300, blank=True, null=True)
    confidence0 = models.SmallIntegerField(blank=True, null=True)
    confidence1 = models.SmallIntegerField(blank=True, null=True)
    confidence2 = models.SmallIntegerField(blank=True, null=True)
    interference = models.NullBooleanField(null=True)
    clicks = models.CharField(max_length=2000, default='[]')
    audio = models.FileField(upload_to="")
    created_at = models.DateTimeField(auto_now_add=True)

class PermAudioFile(models.Model):
    sentence = models.ForeignKey(PermSentence, on_delete=models.CASCADE)
    transcription0 = models.CharField(max_length=300, blank=True, null=True)
    transcription1 = models.CharField(max_length=300, blank=True, null=True)
    transcription2 = models.CharField(max_length=300, blank=True, null=True)
    confidence0 = models.SmallIntegerField(blank=True, null=True)
    confidence1 = models.SmallIntegerField(blank=True, null=True)
    confidence2 = models.SmallIntegerField(blank=True, null=True)
    clicks = models.CharField(max_length=2000, default='[]')
    interference = models.NullBooleanField(null=True)
    audio = models.FileField(upload_to="")
    created_at = models.DateTimeField(auto_now_add=True)

class PostTalkTimings(models.Model):
    sentence = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    timings = models.CharField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PermPostTalkTimings(models.Model):
    sentence = models.ForeignKey(PermSentence, on_delete=models.CASCADE)
    timings = models.CharField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

with open( settings.BASE_DIR + '/face/text_files/countries.txt', 'r') as f:
    
    COUNTRY_CHOICES = json.loads(f.read())

with open( settings.BASE_DIR + '/face/text_files/languages.txt', 'r') as f:
    
    LANGUAGE_CHOICES = json.loads(f.read())

GENDER_CHOICES = (
    ('M', 'male'),
    ('F', 'female'),
)

BORN_CHOICES = (
    ('1940-1944', '1940-1944'),
    ('1944-1949', '1944-1949'),
    ('1950-1954', '1950-1954'),
    ('1955-1959', '1955-1959'),
    ('1960-1964', '1960-1964'),
    ('1964-1969', '1964-1969'),
    ('1970-1974', '1970-1974'),
    ('1975-1979', '1975-1979'),
    ('1980-1984', '1980-1984'),
    ('1984-1989', '1984-1989'),
    ('1990-1994', '1990-1994'),
    ('1995-1999', '1995-1999'),
    ('2000-2005', '2000-2005')
)

LIVED_CHOICES = (
    ('0', 'never'),
    ('1', '0-1 year'),
    ('2', '1-3 years'),
    ('3', '3-5 years'),
    ('4', '5-10 years'),
    ('5', '10+ years'),
)

LEVEL_CHOICES = (
    ('0', 'low beginner'),
    ('1', 'high beginner'),
    ('2', 'low intermediate'),
    ('3', 'high intermediate'),
    ('4', 'low advanced'),
    ('5', 'high advanced'),
)

EDUCATION_CHOICES = [('0', 'no education'), ('1', 'finished primary/elementary school'), ('2', 'finished secondary/high school'), ('3', 'received vocational qualification'), ('4', 'current undergraduate student'), ('5', "received Bachelor's degree"), ('6', "received Master's degree"), ('7', 'received Doctorate or higher')]

class Profile(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    nationality = models.CharField(max_length=40, choices=COUNTRY_CHOICES, null=True, blank=False)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, null=True, blank=False)
    living_now = models.CharField(max_length=40, choices=COUNTRY_CHOICES, null=True, blank=False)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, null=True, blank=False)
    born = models.CharField(max_length=10, choices=BORN_CHOICES, null=True, blank=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=False)
    education = models.CharField(max_length=1, choices=EDUCATION_CHOICES, null=True, blank=False)
    english_level = models.CharField(max_length=1, choices=LEVEL_CHOICES, null=True, blank=False)
    lived_in_english_speaking_country = models.CharField(max_length=1, choices=LIVED_CHOICES, null=True, blank=False)
    consent = models.BooleanField(default=True)
    sound = models.NullBooleanField()
    microphone = models.NullBooleanField()
    tutorial_complete = models.BooleanField(default=False)

class NewsArticle(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    link = models.URLField(null=False, blank=False)
    date = models.DateField()

    def __str__(self):
        return self.date.strftime("%a %d %b %Y") + " -- " + self.title
