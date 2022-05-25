import pytest
from rest_framework.test import APIClient
from marveldcmovies.models import MovieTheater

client: APIClient = APIClient()


@pytest.mark.django_db
def test_movie_theaters():
    response = client.get('/api/movietheaters/')
    assert response.status_code == 200

@pytest.mark.django_db
def test_popular_movie_theaters():
    response = client.get('/api/movietheaters/popular/')
    assert response.status_code == 200

