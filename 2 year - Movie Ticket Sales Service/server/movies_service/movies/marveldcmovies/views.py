from django.contrib.auth.models import User
from rest_framework import views, generics, permissions
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.db.models import F

from .models import Movie, MovieTheater, UsersFavourites
from .serializers import MovieShortenSerializer, MovieFullSerializer, MovieTheaterSerializer, \
    MyTokenObtainPairSerializer, RegisterSerializer


class EmptyRouteAPIView(views.APIView):
    def get(self, request: Request) -> Response:
        return Response({'info': 'Welcome to root page'})


class MoviesAPIView(views.APIView):
    STATUS_SUCCESS_RETURNED: str = 'Successfully returned movies'
    STATUS_SUCCESS_BUT_RETURNED_LESS: str = 'Successfully returned, but only available part'
    STATUS_ERROR_INVALID_QUERY: str = 'Nothing to return. Invalid query'

    def get(self, request: Request, load_from: int = 0, load_to: int = 3) -> Response:
        response: dict = dict()

        all_movies = Movie.objects.all()

        real_load_to: int = min(len(all_movies), max(0, load_to + 1))

        if 0 <= load_from <= real_load_to <= len(all_movies):
            response['success'] = True
            response['data'] = MovieShortenSerializer(all_movies[load_from:real_load_to], many=True).data
            response['howManyLeft'] = len(all_movies) - real_load_to

            if real_load_to - 1 != load_to:
                response['status'] = MoviesAPIView.STATUS_SUCCESS_BUT_RETURNED_LESS
            else:
                response['status'] = MoviesAPIView.STATUS_SUCCESS_RETURNED
        else:
            response['success'] = False
            response['data'] = list()
            response['status'] = MoviesAPIView.STATUS_ERROR_INVALID_QUERY
            response['howManyLeft'] = 0

        return Response(response)


class MovieAPIView(views.APIView):
    def get(self, request: Request, searched_id: str) -> Response:
        response: dict = dict()

        found_in_database = Movie.objects.filter(movie_id=searched_id)

        if len(found_in_database) == 0:
            response['success'] = False
            response['data'] = None
        elif len(found_in_database) == 1:
            found_in_database.update(visits_count=F('visits_count') + 1)
            response['success'] = True
            response['data'] = MovieFullSerializer(found_in_database[0]).data

        return Response(response)


class PopularMoviesAPIView(views.APIView):
    DEFAULT_POPULAR_MOVIES_COUNT: int = 4

    def get(self, request: Request) -> Response:
        all_movies = Movie.objects.all()

        return_count: int = min(PopularMoviesAPIView.DEFAULT_POPULAR_MOVIES_COUNT, len(all_movies))

        popular_movies = all_movies.order_by('-visits_count')[:return_count]

        return Response({'data': MovieShortenSerializer(popular_movies, many=True).data})


class MovieTheatersAPIView(views.APIView):
    def get(self, request: Request) -> Response:
        return Response({'data': MovieTheaterSerializer(MovieTheater.objects.all(), many=True).data})


class MovieTheaterAPIView(views.APIView):
    def get(self, request: Request, searched_title: str) -> Response:
        response: dict = dict()

        found_in_database = MovieTheater.objects.filter(title=searched_title)

        if len(found_in_database) == 0:
            response['success'] = False
            response['data'] = None
        elif len(found_in_database) == 1:
            found_in_database.update(visits_count=F('visits_count') + 1)
            response['success'] = True
            response['data'] = MovieTheaterSerializer(found_in_database[0]).data

        return Response(response)


class MostPopularMovieTheaterAPIView(views.APIView):
    def get(self, request: Request) -> Response:
        return Response({
            'data': MovieTheaterSerializer(MovieTheater.objects.all().order_by('-visits_count')[:2], many=True).data
        })


class MoviesByIdsAPIView(views.APIView):
    def get(self, request: Request) -> Response:
        ids_list: list = list(request.query_params.get('ids').split(','))

        all_movies = Movie.objects

        response: list = list()

        for movie_db_id in ids_list:
            response.append(MovieShortenSerializer(all_movies.filter(id=movie_db_id)[0]).data)

        return Response({'data': response})


class TheatersForMovieAPIView(views.APIView):
    def get(self, request: Request, movie_to_search_theaters: str) -> Response:
        found_in_database = Movie.objects.filter(movie_id=movie_to_search_theaters)

        if len(found_in_database) == 0:
            return Response({'success': False, 'status': 'No such movie exists', 'data': []})

        field_id_for_movie = Movie._meta.get_field('id')
        field_movie_id_for_movie = Movie._meta.get_field('movie_id')

        according_theaters: list = list()

        field_movies_in_theater = MovieTheater._meta.get_field('movies')

        for theater in MovieTheater.objects.all():
            movies_in_this_theater = field_movies_in_theater.value_from_object(theater)

            for movie in movies_in_this_theater:
                if field_movie_id_for_movie.value_from_object(movie) == movie_to_search_theaters:
                    according_theaters.append(MovieTheaterSerializer(theater).data)
                    break

        return Response({'data': according_theaters})


class SearchMovieAPIView(views.APIView):
    def get(self, request: Request, query: str) -> Response:
        all_movies = Movie.objects.all()

        field_title_for_movie = Movie._meta.get_field('title')
        field_movieid_for_movie = Movie._meta.get_field('movie_id')
        field_year_for_movie = Movie._meta.get_field('year')

        found_data: list = list()

        for movie in all_movies:
            title: str = field_title_for_movie.value_from_object(movie).lower()
            movie_id: str = field_movieid_for_movie.value_from_object(movie).lower()
            year: str = str(field_year_for_movie.value_from_object(movie)).lower()

            if (query in title) or (query in movie_id) or (query in year):
                found_data.append(MovieShortenSerializer(movie).data)

        return Response({'data': found_data})


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class AddFavouritesAPIView(views.APIView):
    permission_classes = (IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)
    queryset = User.objects.all()

    def put(self, request: Request, what_to_add: str = '') -> Response:
        found_movies = Movie.objects.filter(movie_id=what_to_add)

        if len(found_movies) == 0:
            return Response({
                'success': False,
                'status': 'Unable to add not existing movie to favourites'
            })
        elif len(found_movies) == 1:
            this_user = User.objects.filter(username=request.user.username)[0]

            if len(UsersFavourites.objects.filter(user=request.user)) == 0:
                UsersFavourites.objects.create(user=this_user)

            searched_row = UsersFavourites.objects.filter(user=request.user)[0]

            if len(searched_row.favourites.filter(movie_id=what_to_add)) != 0:
                return Response({'success': False, 'status': 'Already in your favourites !'})

            searched_row.favourites.add(found_movies[0])

            return Response({'success': True, 'status': 'seemed to be added !'})

        return Response({
            'success': False,
            'status': 'Unable to add, because (I do not know, why, but) there are several movies with such id'
        })


class GetFavouritesAPIView(views.APIView):
    permission_classes = (IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)
    queryset = User.objects.all()

    def get(self, request: Request) -> Response:
        this_user = User.objects.filter(username=request.user.username)[0]

        if len(UsersFavourites.objects.filter(user=request.user)) == 0:
            UsersFavourites.objects.create(user=this_user)

        searched_row = UsersFavourites.objects.filter(user=request.user)[0]

        return Response({'data': MovieShortenSerializer(searched_row.favourites, many=True).data})


class CheckIfInFavourites(views.APIView):
    permission_classes = (IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)
    queryset = User.objects.all()

    def get(self, request: Request, what_to_check: str) -> Response:
        this_user = User.objects.filter(username=request.user.username)[0]

        if len(UsersFavourites.objects.filter(user=request.user)) == 0:
            UsersFavourites.objects.create(user=this_user)

        searched_row = UsersFavourites.objects.filter(user=request.user)[0]

        return Response({'result': len(searched_row.favourites.filter(movie_id=what_to_check)) != 0})


class RemoveFromFavourites(views.APIView):
    permission_classes = (IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)
    queryset = User.objects.all()

    def put(self, request: Request, what_to_remove: str) -> Response:
        if len(UsersFavourites.objects.filter(user=request.user)) == 0:
            return Response({'status': 'Nothing to remove'})

        searched_row = UsersFavourites.objects.filter(user=request.user)[0]

        found_movies = Movie.objects.filter(movie_id=what_to_remove)

        current_favourites = searched_row.favourites.filter(movie_id=what_to_remove)

        if len(current_favourites) != 0:
            searched_row.favourites.remove(found_movies[0])
            return Response({'status': 'successfully removed from favourites'})
        else:
            return Response({'status': 'This movie is not in favourites'})
