from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import viewsets
from account.api.serializers import UserSerializer ,UserRegisterSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


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

class UserRegisterViewSet(viewsets.ViewSet):
    '''
    authentication: Bearer Token
    '''
    http_method_names = ('post')
    permission_classes = (AllowAny,)
    authentication_classes = [] # disables JWT or any auth cause for authentication user have to exdists in our system
    serializer_class = UserRegisterSerializer
    

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        #self.perform_create(serializer)
        obj = serializer.save()
        refresh = RefreshToken.for_user(obj)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        #headers =self.get_success_headers(serializer.data)
        #return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({
            "user":serializer.data,
            "refresh":res["refresh"],
            "token":res["access"]
        },status=status.HTTP_201_CREATED)