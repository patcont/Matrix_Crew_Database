from rest_framework.test import APITestCase

from .models import Nave, Tripulante


class CrewApiTests(APITestCase):
    def setUp(self):
        self.nave = Nave.objects.create(nombre='Nebuchadnezzar')

    def test_crud_tripulante(self):
        r = self.client.post('/api/tripulantes/', {'nombre': 'Neo', 'rol': 'El Elegido', 'nave': self.nave.id})
        self.assertEqual(r.status_code, 201)
        self.assertEqual(r.data['nave_nombre'], 'Nebuchadnezzar')
        tid = r.data['id']

        r = self.client.patch(f'/api/tripulantes/{tid}/', {'rol': 'The One'})
        self.assertEqual(r.data['rol'], 'The One')

        self.assertEqual(self.client.get('/api/naves/').data[0]['tripulantes'], 1)

        self.assertEqual(self.client.delete(f'/api/tripulantes/{tid}/').status_code, 204)
        self.assertFalse(Tripulante.objects.exists())

    def test_ids_with_more_than_one_digit(self):
        # The 2022 version matched ids with ([0-9]), so id 10+ could not be edited or deleted
        for i in range(12):
            Nave.objects.create(nombre=f'Nave {i}')
        last = Nave.objects.order_by('-id').first()
        self.assertEqual(self.client.delete(f'/api/naves/{last.id}/').status_code, 204)

    def test_deleting_ship_keeps_crew(self):
        Tripulante.objects.create(nombre='Trinity', nave=self.nave)
        self.client.delete(f'/api/naves/{self.nave.id}/')
        self.assertIsNone(Tripulante.objects.get(nombre='Trinity').nave)

    def test_validation(self):
        self.assertEqual(self.client.post('/api/naves/', {'nombre': ''}).status_code, 400)
        self.assertEqual(self.client.post('/api/naves/', {'nombre': 'Nebuchadnezzar'}).status_code, 400)
