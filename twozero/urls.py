from django.conf.urls import url
from twozero import views as views

urlpatterns = [
	url(r'^$',views.Home.as_view(),name='home'),
	url(r'^(?P<option>[0-9]+)/$',views.Option.as_view(),name='option'),
	# url(r'^action/(?P<pressid>[0-9]+)/$',views.Logic.as_view(),name='action'),
]