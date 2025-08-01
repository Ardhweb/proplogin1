from rest_framework.permissions import AllowAny,IsAuthenticated
from account.api.serializers import UserSerializer,LoginSerializer,UserUpdateSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404

class UserRegisterView(APIView):
    http_method_names = ['post']
    permission_classes = [AllowAny]
    authentication_classes = [] # disables  authentication user have to exists in our system
    serializer_class = UserSerializer
    

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        return Response({
            "user":serializer.data,
        },status=status.HTTP_201_CREATED)
    
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )
    serializer_class = UserUpdateSerializer
    
    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = self.serializer_class(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = self.serializer_class(user, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response({"message":"user have deleted"},status=status.HTTP_204_NO_CONTENT)
    




class LoginView(APIView):
    authentication_classes = [TokenAuthentication]
    http_method_names = ['post']
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=request.data['username'], password=request.data['password'])
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"message":"Authentication Successfully","user":serializer.data,'token': token.key},status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=401)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def post(self, request):
        try:
            request.user.auth_token.delete()
        except:
            pass
        return Response({"detail": "Successfully logged out."})