from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import viewsets
from account.api.serializers import UserSerializer ,UserRegisterSerializer
from django.contrib.auth.models import User

class UserViewSet(viewsets.ModelViewSet):
    http_method_name = ('get', 'patch')
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        ''' 
        for get list of all users
        '''
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)
    
    def get_object(self):
        ''' 
        for get specific user object.
        '''
        obj = User.objects.get_object_by_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

class UserRegisterViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny)
    serializer_class = UserRegisterSerializer
    http_method_names = ['post']
