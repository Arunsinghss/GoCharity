# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-22 11:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('godonate', '0002_auto_20171122_1027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camp',
            name='goal_amount',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='camptocampfund',
            name='fund_amount',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='collection',
            name='wallet',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='donation',
            name='amount_donated',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
