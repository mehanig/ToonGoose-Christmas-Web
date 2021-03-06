# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-12-05 22:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='GooseRoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(db_index=True, max_length=32)),
                ('selected', models.IntegerField(blank=True, null=True)),
                ('prize1', models.IntegerField()),
                ('prize2', models.IntegerField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Customer')),
            ],
        ),
    ]
