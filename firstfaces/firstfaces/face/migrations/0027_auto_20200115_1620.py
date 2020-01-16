# Generated by Django 2.0 on 2020-01-15 16:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('face', '0026_backgroundcolour_tiaattributes'),
    ]

    operations = [
        migrations.CreateModel(
            name='HairColour',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=30)),
                ('description', models.CharField(blank=True, max_length=30, null=True)),
                ('price', models.SmallIntegerField()),
                ('hair_hex', models.CharField(blank=True, max_length=6)),
                ('brow_hex', models.CharField(blank=True, max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='UserProducts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('backgroundColours', models.CharField(blank=True, max_length=2000, null=True)),
                ('hairColours', models.CharField(blank=True, max_length=2000, null=True)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='tiaattributes',
            name='hairColour',
            field=models.CharField(blank=True, max_length=6),
        ),
    ]
