from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128,min_length=8, write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username','email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials.")
        data['user'] = user
        return data

   