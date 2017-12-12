from godonate.views import *
from django.conf.urls import url
from godonate import views as views
from django.views.generic import TemplateView


app_name = 'godonate'

urlpatterns = [

	url(r'^$',views.Login.as_view(),name='login'),
	url(r'^signup/adduser$',views.AddUser.as_view(),name='adduser'),
	url(r'^signup/$',views.SignUp.as_view(),name='signup'),
	url(r'^dashboard$',views.Dashboard.as_view(),name='dashboard'),
	url(r'^validate$',views.Validate.as_view(),name='validate'),
	url(r'^invalid$',views.InvalidRequest.as_view(),name='invalid'),
	url(r'^addcamp$',views.AddCamp.as_view(),name='addcamp'),
	url(r'^camplist$',views.CampList.as_view(),name='camplist'),
	url(r'^usercamp$',views.UserCampList.as_view(),name='usercamp'),
	url(r'^logout$',views.Logout.as_view(),name='logout'),
	url(r'^userdonating$',views.UserDonate.as_view(),name='userdonating'),
	url(r'^campdonating$',views.CampDonate.as_view(),name='campdonating'),
	url(r'^success$',views.Success.as_view(),name='success'),
	url(r'^multicamp$',views.MultiCamp.as_view(),name='multicamp'),
	url(r'^split/(?P<campid>[0-9]+)/$',views.Split.as_view(),name='split'),
	url(r'^usermanual$',views.UserDonateManual.as_view(),name='usermanual'),
	url(r'^campequal/(?P<campid>[0-9]+)/$',views.CampDonateEqual.as_view(),name='campequal'),
	url(r'^campmanual/(?P<campid>[0-9]+)/$',views.CampDonateManual.as_view(),name='campmanual'),
	url(r'^board/(?P<campid>[0-9]+)/$',views.Board.as_view(),name='board'),
	url(r'^splitmanually$',views.SplitManually.as_view(),name='splitmanually'),

]