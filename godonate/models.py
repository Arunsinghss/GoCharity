# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
# Create your models here.

class BaseModel(models.Model):

	class meta:
		abstract = True

	created_by = models.ForeignKey(User,related_name='%(app_label)s_%(class)s_created_by',null=True,blank=True)
	created_on = models.DateTimeField(default=timezone.now)
	modified_by = models.ForeignKey(User,related_name='%(app_label)s_%(class)s_modified_by',null=True,blank=True)
	modified_on = models.DateTimeField(default=timezone.now)
	deleted_by = models.ForeignKey(User,related_name='%(app_label)s_%(class)s_deleted_by',null=True,blank=True)
	deleted_on = models.DateTimeField(default=timezone.now)


class Person(models.Model):

	GENDER_CHOICES = (
		('M','male'),
		('F','female'),
	)

	user = models.OneToOneField(User)
	gender = models.CharField(max_length=1,choices=GENDER_CHOICES, null=True, blank=True)
	image = models.ImageField(upload_to='personimages/', default='static/images/user.png', null=True, blank=True)
	profession = models.CharField(max_length=25, null=True, blank=True)

	def __str__(self):
		return self.user.first_name


class Camp(BaseModel):

	organizer = models.ForeignKey(Person,related_name='organizer')
	title = models.CharField(max_length=60)
	cause = models.TextField()
	goal_amount = models.PositiveIntegerField(default=0)
	image = models.ImageField(upload_to='campimages/', default='static/images/user.png', null=True, blank=True)

	def __str__(self):
		return '{0}-{1}-{2}-{3}'.format(self.organizer.user.get_full_name,self.title,self.cause,self.goal_amount)


class Collection(BaseModel):

	camp_name = models.OneToOneField(Camp, related_name='camp_name')
	wallet = models.PositiveIntegerField(default=0)

	def __str__(self):
		return '{0}-{1}'.format(self.camp_name.title,self.wallet)


class CampToCampFund(BaseModel):

	raised_to = models.ForeignKey(Camp,related_name='raised_to')
	fund_amount = models.PositiveIntegerField(default=0)
	raised_by = models.ForeignKey(Camp, related_name='raised_by')

	def __str__(self):
		return '{0}-{1}-{2}'.format(self.raised_to.title,self.fund_amount,self.raised_by.title)


class Donation(BaseModel):

	donated_by_camp	=models.ForeignKey(Camp,related_name='donated_by_camp',null=True,blank=True)
	donated_by_user = models.ForeignKey(Person,related_name='donated_by',null=True,blank=True)
	donated_to = models.ForeignKey(Camp,related_name='donated_to')
	amount_donated = models.PositiveIntegerField(default=0)	

	def __str__(self):
		return '{0}-{1}-{2}-{3}'.format(self.donated_by_user,self.donated_to.title,self.donated_by_camp,self.amount_donated)

	





