from django.contrib import admin

from .models import Nave, Tripulante


@admin.register(Nave)
class NaveAdmin(admin.ModelAdmin):
    search_fields = ['nombre']


@admin.register(Tripulante)
class TripulanteAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'rol', 'nave']
    list_filter = ['nave']
    search_fields = ['nombre']
