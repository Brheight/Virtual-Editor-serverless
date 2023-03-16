from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Names

class NamesSerializer(ModelSerializer):

    class Meta:
        model = Names
        fields =('id', 'name', 'edit_token')


class EditNamesSerializer(ModelSerializer):

    
    class Meta:
        model = Names
        fields =('id_token', 'name')



class DeleteNamesSerializer(ModelSerializer):

    
    class Meta:
        model = Names
        fields =('id','id_token')
