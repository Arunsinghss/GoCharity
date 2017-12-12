from django.contrib import admin
from godonate.models import *

# Register your models here.
admin.site.register(Person)
admin.site.register(Camp)
admin.site.register(Collection)
admin.site.register(CampToCampFund)
admin.site.register(Donation)

