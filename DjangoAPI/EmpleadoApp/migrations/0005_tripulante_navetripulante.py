# Generated by Django 4.0.6 on 2022-07-09 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmpleadoApp', '0004_remove_tripulante_fotofilename_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tripulante',
            name='NaveTripulante',
            field=models.CharField(default='SOME STRING', max_length=100),
        ),
    ]