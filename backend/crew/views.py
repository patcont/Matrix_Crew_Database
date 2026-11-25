from rest_framework import viewsets

from .models import Nave, Tripulante
from .serializers import NaveSerializer, TripulanteSerializer


class NaveViewSet(viewsets.ModelViewSet):
    queryset = Nave.objects.prefetch_related('tripulantes')
    serializer_class = NaveSerializer


class TripulanteViewSet(viewsets.ModelViewSet):
    queryset = Tripulante.objects.select_related('nave')
    serializer_class = TripulanteSerializer
