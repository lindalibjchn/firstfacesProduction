# Generated by Django 2.0 on 2019-12-11 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0021_auto_20191209_1433'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sentence',
            name='for_prompt',
        ),
        migrations.AddField(
            model_name='sentence',
            name='prompt_updated_by_teacher',
            field=models.NullBooleanField(),
        ),
    ]
