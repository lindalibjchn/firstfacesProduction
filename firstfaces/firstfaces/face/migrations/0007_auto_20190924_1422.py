# Generated by Django 2.0.4 on 2019-09-24 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0006_auto_20190916_1322'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permsentence',
            name='nod',
        ),
        migrations.RemoveField(
            model_name='permsentence',
            name='nodAmount',
        ),
        migrations.RemoveField(
            model_name='permsentence',
            name='nodSpeed',
        ),
        migrations.RemoveField(
            model_name='tempsentence',
            name='nod',
        ),
        migrations.RemoveField(
            model_name='tempsentence',
            name='nodAmount',
        ),
        migrations.RemoveField(
            model_name='tempsentence',
            name='nodSpeed',
        ),
        migrations.AddField(
            model_name='permsentence',
            name='nod_shake',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='tempsentence',
            name='nod_shake',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
