from twozero.models import *
from django.views import View
from django.shortcuts import render, render_to_response
from django.http import JsonResponse, HttpResponse
from django.views.generic import TemplateView
# Create your views here.

class Home(TemplateView):
	template_name='home.html'
	

class Option(TemplateView):
	template_name='grid.html'
	def get(self, request, option,*args, **kwargs):

		return self.render_to_response({'no_of_blocks':option})		

# class Logic(View):
	
# 	def post(self, request, *args, **kwargs):

# 		return HttpResponse('hello')	