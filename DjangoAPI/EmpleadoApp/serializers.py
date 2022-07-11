from rest_framework import serializers
from EmpleadoApp.models import Nave, Tripulante

class NaveSerializer(serializers.ModelSerializer):
    class Meta:
        model=Nave
        fields = ('IdNave',
                  'NombreNave')
        
class TripulanteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tripulante
        fields = ('IdTripulante',
                  'NombreTripulante',
                  'NaveTripulante',
        )