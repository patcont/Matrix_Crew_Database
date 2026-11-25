from django.db import models


class Nave(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['nombre']
        verbose_name_plural = 'naves'

    def __str__(self):
        return self.nombre


class Tripulante(models.Model):
    nombre = models.CharField(max_length=100)
    rol = models.CharField(max_length=100, blank=True)
    nave = models.ForeignKey(Nave, on_delete=models.SET_NULL, null=True, blank=True,
                             related_name='tripulantes')

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre
