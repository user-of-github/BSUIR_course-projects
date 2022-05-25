from django.contrib import admin

from .models import Movie, MovieTheater, CinematicUniverse, UsersFavourites

admin.site.register(Movie)
admin.site.register(MovieTheater)
admin.site.register(CinematicUniverse)
admin.site.register(UsersFavourites)
