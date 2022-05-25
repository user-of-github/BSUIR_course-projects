from django.db import models
from django.contrib.auth.models import User


class CinematicUniverse(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'Cinematic Universe - {self.name}'


class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    movie_id = models.CharField(max_length=50)
    date_from = models.DateField()
    date_to = models.DateField()
    rating = models.SmallIntegerField()
    poster_image_link = models.CharField(max_length=500)
    duration = models.SmallIntegerField()
    age_restriction = models.SmallIntegerField()
    visits_count = models.IntegerField(default=0)
    category = models.ForeignKey('CinematicUniverse', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f'Movie - {self.title}'


class MovieTheater(models.Model):
    title = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    location = models.CharField(max_length=600)
    photo = models.CharField(max_length=600, default='photo')
    telephone = models.CharField(max_length=80, default='+375')
    visits_count = models.IntegerField(default=0)
    movies = models.ManyToManyField(Movie)

    def __str__(self):
        return f'Movie theater - {self.title}'


class UsersFavourites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    favourites = models.ManyToManyField(Movie)
