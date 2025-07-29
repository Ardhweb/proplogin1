from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from firm.models import Organization
from firm.api.serializers import OrganizationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.authentication import TokenAuthentication

class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        
        return Organization.objects.filter(user=self.request.user)

    def list(self, request):
        queryset = self.get_queryset() 
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        
    def retrieve(self, request, *args, **kwargs):
            try:
                obj = Organization.objects.get(pk=kwargs.get('pk'), user=self.request.user)
            except Organization.DoesNotExist:
                raise NotFound("Firm not found.")
            
            serializer = self.get_serializer(obj)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
       

    def perform_create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
    
        
