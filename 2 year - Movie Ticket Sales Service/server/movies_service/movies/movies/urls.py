from django.contrib import admin
from django.urls import path
from marveldcmovies.views import MoviesAPIView, MovieAPIView, SearchMovieAPIView, MyTokenObtainPairView, RegisterView
from marveldcmovies.views import PopularMoviesAPIView, MoviesByIdsAPIView, TheatersForMovieAPIView
from marveldcmovies.views import MovieTheatersAPIView, MovieTheaterAPIView, MostPopularMovieTheaterAPIView
from marveldcmovies.views import AddFavouritesAPIView, GetFavouritesAPIView, CheckIfInFavourites, RemoveFromFavourites
from rest_framework_simplejwt.views import TokenRefreshView
from marveldcmovies.views import EmptyRouteAPIView

urlpatterns = [
    path('', EmptyRouteAPIView.as_view()),

    path('admin/', admin.site.urls),

    path('api/movies/', MoviesAPIView.as_view()),
    path('api/movies/<int:load_from>/<int:load_to>/', MoviesAPIView.as_view()),
    path('api/movies/getmovieslistbyids/', MoviesByIdsAPIView.as_view()),
    path('api/popularmovies/', MoviesAPIView.as_view()),
    path('api/movie/<str:searched_id>/', MovieAPIView.as_view()),
    path('api/movies/popular/', PopularMoviesAPIView.as_view()),
    path('api/movietheaters/', MovieTheatersAPIView.as_view()),
    path('api/movietheaters/popular/', MostPopularMovieTheaterAPIView.as_view()),
    path('api/movietheaters/<str:searched_title>/', MovieTheaterAPIView.as_view()),
    path('api/theatersformovie/<str:movie_to_search_theaters>/', TheatersForMovieAPIView.as_view()),
    path('api/searchmovie/<str:query>/', SearchMovieAPIView.as_view()),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='auth_register'),

    path('api/addfavourite/<str:what_to_add>/', AddFavouritesAPIView.as_view()),
    path('api/getfavourites/', GetFavouritesAPIView.as_view()),
    path('api/checkiffavourite/<str:what_to_check>/', CheckIfInFavourites.as_view()),
    path('api/removefromfavourite/<str:what_to_remove>/', RemoveFromFavourites.as_view()),

]
