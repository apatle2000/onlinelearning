# Generated by Django 4.1.5 on 2023-01-26 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='accessed_course',
            name='course_name',
            field=models.TextField(null=True),
        ),
    ]