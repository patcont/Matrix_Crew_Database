from rest_framework import serializers

from .models import Nave, Tripulante


class NaveSerializer(serializers.ModelSerializer):
    tripulantes = serializers.IntegerField(source='tripulantes.count', read_only=True)

    class Meta:
        model = Nave
        fields = ['id', 'nombre', 'tripulantes']


class TripulanteSerializer(serializers.ModelSerializer):
    nave_nombre = serializers.CharField(source='nave.nombre', read_only=True, default=None)

    class Meta:
        model = Tripulante
        fields = ['id', 'nombre', 'rol', 'nave', 'nave_nombre']
