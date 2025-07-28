from rest_framework.permissions import AllowAny,IsAuthenticated
from account.api.serializers import UserRegisterSerializer,LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication


class UserRegisterView(APIView):
    http_method_names = ['post']
    permission_classes = [AllowAny]
    #authentication_classes = [] # disables  authentication user have to exists in our system
    serializer_class = UserRegisterSerializer
    

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "user":serializer.data,
        },status=status.HTTP_201_CREATED)



class LoginView(APIView):
    authentication_classes = [TokenAuthentication]
    http_method_names = ['post']
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message":"Authentication Successfully", "username":user.username,"email":user.email,'token': token.key},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

    