from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', ]

class UserRegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128,min_length=8, write_only=True, required=True)
    class Meta:
        model = User
        fields = ['id','username','email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)