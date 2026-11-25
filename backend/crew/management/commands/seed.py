from django.core.management.base import BaseCommand

from crew.models import Nave, Tripulante

CREW = {
    'Nebuchadnezzar': [('Neo', 'El Elegido'), ('Trinity', 'Primera oficial'), ('Morpheus', 'Capitán'),
                       ('Tank', 'Operador'), ('Apoc', 'Tripulante'), ('Switch', 'Tripulante')],
    'Logos': [('Niobe', 'Capitana'), ('Ghost', 'Primer oficial')],
    'Hammer': [('Roland', 'Capitán')],
}


class Command(BaseCommand):
    help = 'Carga naves y tripulantes de ejemplo'

    def handle(self, *args, **options):
        for nave_nombre, tripulantes in CREW.items():
            nave, _ = Nave.objects.get_or_create(nombre=nave_nombre)
            for nombre, rol in tripulantes:
                Tripulante.objects.get_or_create(nombre=nombre, defaults={'rol': rol, 'nave': nave})
        self.stdout.write(self.style.SUCCESS('Datos de ejemplo cargados.'))
