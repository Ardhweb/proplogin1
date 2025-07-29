from rest_framework import serializers
from django.contrib.auth.models import User
from firm.models import Organization
from account.api.serializers import UserSerializer

class OrganizationSerializer(serializers.ModelSerializer):
    user  = UserSerializer(read_only=True)

    class Meta:
        model = Organization
        fields = ['id','firm_name', 'address','tax_id','gstin','country','phone','city','email','user']
        #read_only_fields = ['user']