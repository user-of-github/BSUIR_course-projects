import re

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
# from .models import CustomUser as User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from marveldcmovies.models import MovieTheater, Movie


class MovieShortenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'movie_id', 'date_from', 'date_to', 'poster_image_link']


class MovieFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        exclude = ['id', 'visits_count']


class MovieTheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieTheater
        exclude = ['visits_count', 'id']

# Useful post about authorization
# https://habr.com/ru/post/512746/


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class RegisterSerializer(serializers.ModelSerializer):
    PASSWORD_REGEX: str = r'[A-Za-z0-9]{4,}'
    EMAIL_REGEX: str = r'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$'

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def validate(self, attrs):
        if not re.compile(RegisterSerializer.PASSWORD_REGEX).match(attrs['password']):
            raise serializers.ValidationError({'password': 'Wrong password (must contain 4+ symbols with letters or digits'})

        if not re.compile(RegisterSerializer.EMAIL_REGEX).match(attrs['email']):
            raise serializers.ValidationError({'email': 'Wrong email'})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

