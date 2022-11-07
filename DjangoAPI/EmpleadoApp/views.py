from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from EmpleadoApp.models import Nave, Tripulante
from EmpleadoApp.serializers import NaveSerializer, TripulanteSerializer
from django.http.response import JsonResponse
# Create your views here.
@csrf_exempt
def tripulanteApi(request,id=0):
    if request.method == "GET":
        tripulante = Tripulante.objects.all()
        tripulante_serializer = TripulanteSerializer(tripulante, many=True)
        return JsonResponse(tripulante_serializer.data, safe=False)
    elif request.method == "POST":
        tripulante_data= JSONParser().parse(request)
        tripulante_serializer = TripulanteSerializer(data=tripulante_data)
        if tripulante_serializer.is_valid():
            tripulante_serializer.save()
            return JsonResponse('Agregado con exito', safe=False)
        return JsonResponse("Fallo en agregar :(", safe=False)
    elif request.method == 'PUT':
        tripulante_data = JSONParser().parse(request)
        tripulante=Tripulante.objects.get(IdTripulante=tripulante_data["IdTripulante"])
        tripulante_serializer= TripulanteSerializer(tripulante, data= tripulante_data)
        if tripulante_serializer.is_valid():
            tripulante_serializer.save()
            return JsonResponse("Actualizacion Exitosa", safe=False)
        return JsonResponse("Error al actualizar", safe=False)
    elif request.method == 'DELETE':
        tripulante=Tripulante.objects.get(IdTripulante=id)
        tripulante.delete()
        return JsonResponse("Eliminacion exitosa", safe=False)
    
@csrf_exempt
def naveApi(request,id=0):
    if request.method == "GET":
        nave = Nave.objects.all()
        nave_serializer = NaveSerializer(nave, many=True)
        return JsonResponse(nave_serializer.data, safe=False)
    elif request.method == "POST":
        nave_data= JSONParser().parse(request)
        nave_serializer = NaveSerializer(data=nave_data)
        if nave_serializer.is_valid():
            nave_serializer.save()
            return JsonResponse('Agregado con exito', safe=False)
        return JsonResponse("Fallo en agregar :(", safe=False)
    elif request.method == 'PUT':
        nave_data = JSONParser().parse(request)
        nave=Nave.objects.get(IdNave=nave_data["IdNave"])
        nave_serializer= NaveSerializer(nave, data= nave_data)
        if nave_serializer.is_valid():
            nave_serializer.save()
            return JsonResponse("Actualizacion Exitosa", safe=False)
        return JsonResponse("Error al actualizar", safe=False)
    elif request.method == 'DELETE':
        nave=Nave.objects.get(IdNave=id)
        nave.delete()
        return JsonResponse("Eliminacion exitosa", safe=False)
    
