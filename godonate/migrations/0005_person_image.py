# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-27 12:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('godonate', '0004_camp_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='image',
            field=models.ImageField(blank=True, default='static/images/user.png', null=True, upload_to='personimages/'),
        ),
    ]