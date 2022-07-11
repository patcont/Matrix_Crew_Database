from django.db import models

# Create your models here.

class Nave(models.Model):
    IdNave = models.AutoField(primary_key=True)
    NombreNave = models.CharField(max_length=100)
    
class Tripulante(models.Model):
    IdTripulante = models.AutoField(primary_key=True)
    NombreTripulante = models.CharField(max_length=100)
    NaveTripulante = models.CharField(max_length=100, default="SOME STRING")
  