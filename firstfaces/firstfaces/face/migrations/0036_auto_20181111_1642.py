# Generated by Django 2.0 on 2018-11-11 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0035_available_avail_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='audiofile',
            name='interference',
            field=models.NullBooleanField(),
        ),
        migrations.AddField(
            model_name='permaudiofile',
            name='interference',
            field=models.NullBooleanField(),
        ),
    ]
