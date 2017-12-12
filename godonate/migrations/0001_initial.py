# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-22 10:26
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_on', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_on', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(blank=True, choices=[('M', 'male'), ('F', 'female')], max_length=1, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Camp',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='godonate.BaseModel')),
                ('title', models.CharField(max_length=60)),
                ('cause', models.TextField()),
                ('goal_amount', models.IntegerField(default=0)),
                ('organizer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='organizer', to='godonate.Person')),
            ],
            bases=('godonate.basemodel',),
        ),
        migrations.CreateModel(
            name='CampToCampFund',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='godonate.BaseModel')),
                ('fund_amount', models.IntegerField(default=0)),
                ('raised_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='raised_by', to='godonate.Camp')),
                ('raised_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='raised_to', to='godonate.Camp')),
            ],
            bases=('godonate.basemodel',),
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='godonate.BaseModel')),
                ('wallet', models.IntegerField(default=0)),
                ('camp_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='camp_name', to='godonate.Camp')),
            ],
            bases=('godonate.basemodel',),
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='godonate.BaseModel')),
                ('amount_donated', models.IntegerField(default=0)),
                ('donated_by_camp', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='donated_by_camp', to='godonate.Camp')),
                ('donated_by_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='donated_by', to='godonate.Person')),
                ('donated_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donated_to', to='godonate.Camp')),
            ],
            bases=('godonate.basemodel',),
        ),
        migrations.AddField(
            model_name='basemodel',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='godonate_basemodel_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='basemodel',
            name='deleted_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='godonate_basemodel_deleted_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='basemodel',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='godonate_basemodel_modified_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
