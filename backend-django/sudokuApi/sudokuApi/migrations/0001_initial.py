# Generated by Django 4.2.3 on 2023-07-04 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sudoku',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('puzzle', models.CharField(max_length=82)),
                ('difficulty', models.CharField(max_length=10)),
            ],
        ),
    ]