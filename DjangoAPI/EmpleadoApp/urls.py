from django.urls import re_path as url
from EmpleadoApp import views

urlpatterns = [
    url(r'^nave/$', views.naveApi),
    url(r'^nave/([0-9])$', views.naveApi),
    
    
    url(r'^tripulante/$', views.tripulanteApi),
    url(r'^tripulante/([0-9])$', views.tripulanteApi)
]
