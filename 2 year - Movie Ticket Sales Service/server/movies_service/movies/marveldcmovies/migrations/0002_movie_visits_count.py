# Generated by Django 4.0.4 on 2022-05-14 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marveldcmovies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='visits_count',
            field=models.IntegerField(default=0),
        ),
    ]