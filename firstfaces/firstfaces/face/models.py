from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Session(models.Model):

    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    learner_emotion = models.CharField(max_length=12, null=True, blank=True)
    topic = models.CharField(max_length=100, null=True, blank=True)
    score = models.SmallIntegerField(null=True, blank=True)
                         
    def __str__(self):
        return  str(self.pk) + "___" + self.learner.username + '___' + str(self.start_time.strftime("%a %d %b %H:%M")) + '___' + str(self.score)

class Available(models.Model):
    start_availability = models.DateTimeField()
    end_availability = models.DateTimeField()
    
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return  str(self.pk) + ": " + str(self.sentence)

# may need multiple audio files per sentence as student attempts and re-attempts
class AudioFile(models.Model):
    sentence = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    audio = models.FileField(upload_to="")

class Profile(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE)
    GENDER_CHOICES = (
        ('M', 'male'),
        ('F', 'female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)


