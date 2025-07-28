from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from firm.models import Organization
from firm.api.serializers import OrganizationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]

    def list(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.user.is_authenticated:
            obj = Organization.objects.filter(user=request.user)
            serializer = self.get_serializer(obj, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Authentication required to get firm list associted with you."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
    def retrieve(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                obj = Organization.objects.get(pk=kwargs.get('pk'), user=request.user)
            except Organization.DoesNotExist:
                raise NotFound("Book not found or you don't have permission to view it.")
            
            serializer = self.get_serializer(obj)
            serializer.is_valid(raise_exception=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Authentication required to get firm list associted with you."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        

    def perform_create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
    
        if request.user.is_authenticated:
            serializer.save(user=request.user)
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"error": "Authentication required to create a new firm."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
