# Generated by Django 4.1.5 on 2023-01-25 02:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('login', '0001_initial'),
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Guide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notes', models.CharField(blank=True, max_length=500)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.courses')),
                ('login_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.person')),
            ],
            options={
                'db_table': 'Guide',
            },
        ),
    ]