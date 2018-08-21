# Generated by Django 2.0 on 2018-06-16 19:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('face', '0002_session_audio'),
    ]

    operations = [
        migrations.CreateModel(
            name='AudioFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audio', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Sentence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.CharField(max_length=300)),
                ('judgement', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('emotion', models.CharField(blank=True, max_length=5, null=True)),
                ('wrong_indexes', models.CharField(blank=True, max_length=30, null=True)),
                ('correction', models.CharField(blank=True, default='', max_length=300)),
                ('checked_error', models.NullBooleanField()),
                ('try_again', models.NullBooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='cursentence',
            name='learner',
        ),
        migrations.RemoveField(
            model_name='cursentence',
            name='session',
        ),
        migrations.RemoveField(
            model_name='session',
            name='audio',
        ),
        migrations.DeleteModel(
            name='CurSentence',
        ),
        migrations.AddField(
            model_name='sentence',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.Session'),
        ),
        migrations.AddField(
            model_name='audiofile',
            name='sentence',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.Sentence'),
        ),
    ]
