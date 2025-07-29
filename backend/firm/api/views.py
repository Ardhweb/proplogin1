from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from firm.models import Organization
from firm.api.serializers import OrganizationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404

class OrganizationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    
    def get_queryset(self):
        
        return Organization.objects.filter(user=self.request.user)
    
    def get_object(self):
        pk = self.kwargs.get('pk')  # or whatever your URL uses (e.g., 'id')
        obj = get_object_or_404(self.serializer_class.Meta.model, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj

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
    
    # def perform_update(self,request):
    #     serializer = self.serializer_class(data=request.data)
    #     serializer.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
        
