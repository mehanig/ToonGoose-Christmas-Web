# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-12-22 22:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_prizepoolitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='InvitedUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('referrer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(db_index=True, max_length=32)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Customer')),
            ],
        ),
    ]
