import pytest
from rest_framework.test import APIClient


client: APIClient = APIClient()


@pytest.mark.django_db
def test_register_user():
    payload = dict({
        'username': 'HarryPotter2022',
        'email': 'harrypotter@gmail.com',
        'password': 'lordvolandemort2022'
    })

    response = client.post('/api/register/', payload)

    data = response.data

    assert data['username'] == payload['username']
    assert data['email'] == payload['email']
    assert 'password' not in data
    assert 200 <= response.status_code < 300


@pytest.mark.django_db
def test_login_user():
    payload = dict({
        'username': 'HarryPotter2022',
        'email': 'harrypotter@gmail.com',
        'password': 'lordvolandemort2022'
    })

    client.post('/api/register/', payload)

    response = client.post('/api/token/', dict(username='HarryPotter2022', password='lordvolandemort2022'))

    assert response.status_code == 200


@pytest.mark.django_db
def test_login_user_fail():
    response = client.post('/api/token/', dict(username='Harotter2022', password='lordvolanemort2022'))
    assert response.status_code == 401


@pytest.mark.django_db
def test_anauthorized_getfavourites():
    response = client.get('/api/getfavourites/')
    assert response.status_code == 401


@pytest.mark.django_db
def test_add_favourites():
    response = client.get('/api/addfavourite/kekunknownshrek')
    assert response.status_code != 200
