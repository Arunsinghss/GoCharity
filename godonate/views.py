from godonate.models import *
from django.views import View
from django.db.models import F
from django.db.models import Q
from django.shortcuts import render
from django.template import RequestContext
from django.contrib.auth.models import User
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,reverse,render_to_response
from django.http import JsonResponse,  HttpResponse, HttpResponseRedirect



class Login(TemplateView):
	template_name = 'login.html'


class SignUp(TemplateView):
	template_name = 'signup.html'


class InvalidRequest(TemplateView):
	template_name = 'invalid.html'


class Success(TemplateView):
	template_name = 'success.html'

class SplitManually(TemplateView):
	template_name = 'splitmanually.html'	


class Dashboard(TemplateView):
	template_name = 'dashboard.html'

	@method_decorator(login_required)
	def post(self, request, *args, **kwargs):
		context['person'] = Person.objects.get(user=request.user)
		return render_to_response(template_name,context)


class AddUser(View):

	def post(self, request, *args, **kwargs):

		user_name = request.POST.get('username')
		first_name = request.POST.get('firstname')
		last_name = request.POST.get('lastname')
		email = request.POST.get('email')
		password = request.POST.get('password')
		gender = request.POST.get('gender')
	
		if Person.objects.filter(Q(user__email=email)| Q(user__username=user_name)).exists():
			data = {
				'error':'User already exists',
				'success' :False
			}
			return JsonResponse(data)
		else:
			new_user = User.objects.create_user(username=user_name,first_name=first_name,last_name=last_name,email=email,password=password)
			new_user.save()
			person = Person.objects.create(user=new_user,gender=gender)
			person.save()

			data = {
				'url':'/godonate',
				'success': True
			}
			return JsonResponse(data)



class Validate(TemplateView):
	template_name = 'dashboard.html'
	
	def post(self, request, *args, **kwargs):
		
		username=request.POST.get('username')
		password=request.POST.get('password')
		user = authenticate(username=username,password=password)
		if user is not None:
			login(request,user)
			data = {
				'url':'camplist',
				'success': True
			}
			return JsonResponse(data)		
		else:
			data = {
			'errors' : 'Invalid Username or Password...Please try again',
			'success': False				
			}
			return JsonResponse(data)



class AddCamp(TemplateView):

	@method_decorator(login_required)
	def post(self, request, *args, **kwargs):

		title = request.POST.get('title')
		cause = request.POST.get('cause')
		goal_amount = request.POST.get('goal')
		# image = request.FILES('file',None)

		if Camp.objects.filter(title=title).exists():
			return HttpResponse('Camp with same name already exists...Please try another name')
		else:
			camp = Camp.objects.create(organizer=request.user.person,title=title,cause=cause,goal_amount=goal_amount,created_by=request.user)
			camp.save()
			collection = Collection.objects.create(camp_name=camp)
			collection.save()
			return HttpResponseRedirect(reverse('godonate:camplist'))



class CampList(TemplateView):
	template_name = 'camplist.html'

	@method_decorator(login_required)
	def get(self, request, *args, **kwargs):

		camps = Camp.objects.all()
		context = ({'camps':camps})		
		person = Person.objects.get(user=request.user)

		if Camp.objects.filter(organizer=person).exists():
			mycamps = Camp.objects.filter(organizer=person)
			eligiblecamps = list()

			for camp in mycamps:
				goal_amount = camp.goal_amount
				collection = Collection.objects.get(camp_name=camp)
				if collection.wallet > goal_amount:
					eligiblecamps.append(camp)
			othercamps = Camp.objects.exclude(organizer=person)
			context.update({'isapplicable':'yes','mycamps':eligiblecamps,'othercamps':othercamps})
		return self.render_to_response(context)	



class UserCampList(TemplateView):
	template_name = 'usercamp.html'

	@method_decorator(login_required)
	def get(self, request, *args, **kwargs):
		
		person = Person.objects.get(user=request.user)
		camps = Camp.objects.filter(organizer=person)
		collections = Collection.objects.filter(camp_name__organizer__user=request.user)
		return self.render_to_response({'camps':camps,'collections':collections})


		 
class Logout(TemplateView):

	@method_decorator(login_required)
	def get(self,request):
		logout(request)
		return HttpResponseRedirect(reverse('godonate:login'))



class UserDonate(TemplateView):
	template_name = 'success.html'

	@method_decorator(login_required)
	def post(self, request, *args, **kwargs):


		to_camp = request.POST.get('tocamp',None)
		amount = request.POST.get('amount',None)

		if amount is None or to_camp is None:
			return HttpResponse('Please select valid camp and amount you need to donate')
		else:
			person = Person.objects.get(user=request.user)
			camp = Camp.objects.get(id=to_camp)
			collection = Collection.objects.get(camp_name=camp)
			collection.wallet=F('wallet')+float(amount)
			collection.save()
			donation = Donation.objects.create(donated_by_user=person,donated_to=camp,amount_donated=amount)	
			donation.save()
			context = {'mycamp': 12}
			return self.render_to_response(context)	
		


class CampDonate(TemplateView):

	@method_decorator(login_required)
	def post(self, request, *args, **kwargs):

		from_camp = request.POST.get('fromcamp',None)
		to_camp = request.POST.get('tocamp',None)
		amount = int(request.POST.get('amount',None))	
		camp = Camp.objects.get(id=from_camp)
		collection = Collection.objects.get(camp_name=camp)
		can_donate_amt = collection.wallet-camp.goal_amount

		if collection.wallet < camp.goal_amount:
			return HttpResponse('Sorry {0} has not reached its goal amount, so you cannot donate with your camp wallet'.format(camp.title))
		if  amount > can_donate_amt:
			return HttpResponse('Sorry {0} cannot donate more than {1}'.format(camp.title,can_donate_amt))
		else:
			from_camp = Camp.objects.get(id=from_camp)
			to_camp = Camp.objects.get(id=to_camp)
			collection = Collection.objects.get(camp_name=to_camp)
			collection.wallet = F('wallet')+float(amount)
			collection.save()
			deduction = Collection.objects.get(camp_name=from_camp)
			deduction.wallet = F('wallet')-float(amount)
			deduction.save()
			donation = Donation.objects.create(donated_by_camp=from_camp,donated_to=to_camp,amount_donated=amount)	
			donation.save()
			camp = CampToCampFund.objects.create(raised_to=to_camp,raised_by=from_camp,fund_amount=amount)
			camp.save()
			return HttpResponseRedirect(reverse('godonate:success'))


class MultiCamp(TemplateView):
	template_name = 'multicamp.html'
	
	@method_decorator(login_required)
	def get(self, request, *args, **kwargs):

		person = Person.objects.get(user=request.user)
		camps = Camp.objects.exclude(organizer=person)
		context = {
			'camps' : camps
		}
		return self.render_to_response(context)



class Split(TemplateView):
	template_name = 'splitform.html'

	@method_decorator(login_required)
	def get(self, request, campid, *args, **kwargs):
		mycamp = Camp.objects.get(id=int(campid))
		othercamps = Camp.objects.exclude(organizer__user=request.user)
		othercamp = list()
		for camp in othercamps:
			collection = Collection.objects.get(camp_name=camp)
			if camp.goal_amount > collection.wallet:
				continue
			else:
				othercamp.append(camp)

		collection = Collection.objects.get(camp_name=mycamp)			
		can_donate_amt = collection.wallet - mycamp.goal_amount	
		camp_context = {'mycamp':mycamp,'othercamps':othercamp,'candonate':can_donate_amt}
		return self.render_to_response(camp_context)
		


class UserDonateManual(TemplateView):
	template_name = 'success.html'

	@method_decorator(login_required)
	def post(self, request, *args, **kwargs):

		data = dict()
		for key,value in request.POST.items():
			value = request.POST.get(key,None)
			if not value or not len(value.strip(' ')):
				continue
			else:
				data.update({key:value})				
		data.pop('csrfmiddlewaretoken')

		context = dict()
		for camp,amount in data.items():
			amount = float(amount)
			to_camp = Camp.objects.get(id=camp)
			context.update({'mycamp':to_camp})
			person = Person.objects.get(user=request.user)
			collection = Collection.objects.get(camp_name=to_camp)
			collection.wallet=F('wallet')+float(amount)
			collection.save()
			donation = Donation.objects.create(donated_by_user=person,donated_to=to_camp,amount_donated=amount)	
			donation.save()

		return self.render_to_response(context)	


class CampDonateEqual(TemplateView):
	template_name = 'success.html'

	@method_decorator(login_required)
	def get(self, request, campid, *args, **kwargs):

		my_camp = Camp.objects.get(id=campid)
		goal_amount = my_camp.goal_amount
		collection = Collection.objects.get(camp_name=my_camp)
		can_donate = collection.wallet - my_camp.goal_amount
		to_camps = Camp.objects.exclude(id=my_camp.id)	
		final_camps = list()

		for camp in to_camps:
			goal_amount = camp.goal_amount
			collection = Collection.objects.get(camp_name=camp)	
			if collection.wallet < goal_amount:
				continue	
			else:
				final_camps.append(camp)

		if len(final_camps) < 1:
			return HttpResponse('All camps have reached their goal amount already..Thankyou')
		else:
			amount = float(can_donate)/len(final_camps)
			from_camp = Camp.objects.get(id=campid)
			for to_camp in final_camps:
				to_camp = Camp.objects.get(id=to_camp.id)
				collection = Collection.objects.get(camp_name=to_camp)
				collection.wallet = F('wallet')+float(amount)
				collection.save()
				donation = Donation.objects.create(donated_by_camp=from_camp,donated_to=to_camp,amount_donated=amount)	
				donation.save()
				camp = CampToCampFund.objects.create(raised_to=to_camp,raised_by=from_camp,fund_amount=amount)
				camp.save()

		deduction = Collection.objects.get(camp_name=my_camp)
		deduction.wallet = F('wallet')-float(can_donate)
		deduction.save()		
		context = {'mycamp':my_camp}		
		return self.render_to_response(context)


class CampDonateManual(TemplateView):
	template_name = 'success.html'
	
	@method_decorator(login_required)
	def post(self, request, campid, *args, **kwargs):
		data = dict()
		for key,value in request.POST.items():
			value = request.POST.get(key,None)
			if not value or not len(value.strip(' ')):
				continue
			else:
				data.update({key:value})	
		data.pop('csrfmiddlewaretoken')
		from_camp = Camp.objects.get(id=int(campid))
		collection = Collection.objects.get(camp_name=from_camp)
		can_donate_amt = collection.wallet-from_camp.goal_amount
		amount = 0
		
		for value in data.values():
			amount += float(value) 

		if collection.wallet < from_camp.goal_amount:
			return HttpResponse('Sorry {0} has not reached its goal amount, so you cannot donate with your from_camp wallet'.format(from_camp.title))
		if  amount > can_donate_amt:
			return HttpResponse('Sorry {0} cannot donate more than {1}'.format(from_camp.title,can_donate_amt))
		else:
			for camp,amount in data.items():
				to_camp = Camp.objects.get(id=int(camp))
				collection = Collection.objects.get(camp_name=to_camp)
				collection.wallet = F('wallet')+float(amount)
				collection.save()
				deduction = Collection.objects.get(camp_name=from_camp)
				deduction.wallet = F('wallet')-float(amount)
				deduction.save()
				donation = Donation.objects.create(donated_by_camp=from_camp,donated_to=to_camp,amount_donated=float(amount))	
				donation.save()
				camp = CampToCampFund.objects.create(raised_to=to_camp,raised_by=from_camp,fund_amount=float(amount))
				camp.save()

		context = {'mycamp': from_camp}
		return self.render_to_response(context)


class Board(TemplateView):
	template_name = 'board.html'

	@method_decorator(login_required)
	def get(self, request, campid, *args, **kwargs):
		my_camp = Camp.objects.get(id=campid)
		current_user = Person.objects.get(user=request.user)

		donation = Donation.objects.filter(donated_to=my_camp,donated_by_camp__isnull=True).order_by('-amount_donated')
		top_persons = dict()
		for person in donation:
			if person.donated_by_user.user.first_name not in top_persons.keys():
				top_persons.update({ person.donated_by_user.user.first_name:person.amount_donated})
			else:
				top_persons[person.donated_by_user.user.first_name] += person.amount_donated 

		donor_camps = Donation.objects.filter(donated_to=my_camp,donated_by_user__isnull=True).order_by('-amount_donated')
		top_camps = dict()
		for camp in donor_camps:
			if camp.donated_by_camp.title not in top_camps.keys():
				top_camps.update({ camp.donated_by_camp.title:camp.amount_donated})
			else:
				top_camps[camp.donated_by_camp.title] += camp.amount_donated 
	
		top_persons = sorted({(v,Person.objects.get(user__first_name=k)) for (k,v) in top_persons.items()})
		top_camps = sorted({(v,Camp.objects.get(title=k)) for (k,v) in top_camps.items()})

		context = {
			'camps':top_camps[::-1],
			'camp':my_camp,
			'persons':top_persons[::-1],
			'user':current_user,
		}
		
		goal_amount = my_camp.goal_amount
		collection = Collection.objects.get(camp_name=my_camp)

		if collection.wallet < goal_amount:

			percentage = collection.wallet/goal_amount

			percentage = percentage*100
			context.update({'percentage':int(percentage)})

		else:
			context.update({'percentage':100})

		if collection.wallet > goal_amount:
			can_donate_amt = collection.wallet - my_camp.goal_amount
			context.update({'iseligible':True,'candonateamt':can_donate_amt})
		return self.render_to_response(context)