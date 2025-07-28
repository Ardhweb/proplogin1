from rest_framework import serializers
from django.contrib.auth.models import User
from firm.models import Organization

class OrganizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organization
        fields = ['id','firm_name','user']
        read_only_fields = ['user']