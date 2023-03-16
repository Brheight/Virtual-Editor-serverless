from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import Names
# Create your views here.

def index(request, *args, **kwargs):
    return render(request, "api/index.html")


class NamesSerializerView(generics.ListAPIView):
    serializer_class = NamesSerializer
    queryset = Names.objects.all()


class AddNameSerializer(APIView):
    serializer_class = NamesSerializer

    def post(self, request, format=None):

        serialize = self.serializer_class(data= request.data)
        
        if serialize.is_valid():

            name = serialize.data.get("name")
            edit_token = serialize.data.get("edit_token")
            added = Names(name = name, edit_token= edit_token)
            added.save()

            return Response({'Accepted':'created'}, status = status.HTTP_202_ACCEPTED)
        
        return Response({'Failed':'failed'}, status = status.HTTP_400_BAD_REQUEST)
    

class EditNameSerializer(APIView):

    serializer_class = EditNamesSerializer
    
    def post(self, request, format=None):
        
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            
            name = serializer.data.get('name')
            id = serializer.data.get('id_token')
            queryset = Names.objects.filter(id = id)

            if not queryset.exists():
                return Response({'msg':'Name not found'}, status = status.HTTP_404_NOT_FOUND )
            edit = queryset[0]
            edit.name = name
            edit.save(update_fields=['name'])

            return Response(NamesSerializer(edit).data, status = status.HTTP_200_OK)
        
        return Response({'Bad Request':'Invalid Data!'}, status = status.HTTP_400_BAD_REQUEST)
    


class DeleteNameSerializer(APIView):

    serializer_class = DeleteNamesSerializer
    
    def post(self, request, format=None):
        
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            
            name = serializer.data.get('name')
            id = serializer.data.get('id_token')
            queryset = Names.objects.filter(id = id)

            if not queryset.exists():
                return Response({'msg':'Name not found'}, status = status.HTTP_404_NOT_FOUND )
            edit = queryset[0]
            #edit.name = name
            edit.delete()

            return Response(NamesSerializer(edit).data, status = status.HTTP_200_OK)
        
        return Response({'Bad Request':'Invalid Data!'}, status = status.HTTP_400_BAD_REQUEST)
    
class GetNameSerializer(APIView):
    serializer_class = NamesSerializer

    def get(self, request, format = None):
        queryset = Names.objects.all()
        names =  queryset
        return Response(NamesSerializer(names, many=True).data, status = status.HTTP_200_OK)