from django.db import models

# Create your models here.

class Names(models.Model):

    id_token = models.IntegerField(default =0)
    name = models.CharField(unique=False, max_length=50)
    edit_token = models.BooleanField(null = False, default =False)