# Generated by Django 2.0.2 on 2018-07-21 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0010_sentence_whats_wrong_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sentence',
            name='judgement',
            field=models.CharField(blank=True, choices=[('C', 'correct'), ('B', 'better'), ('M', 'mean_by'), ('I', 'incorrect'), ('D', 'dunno'), ('3', 'more_than_three')], max_length=1, null=True),
        ),
    ]
