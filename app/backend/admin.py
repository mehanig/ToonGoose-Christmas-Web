from django.contrib import admin
from backend.models import GooseRoll, Customer, PromoCode, PrizePoolItem, InvitedUser


admin.site.register(GooseRoll)
admin.site.register(Customer)
admin.site.register(InvitedUser)
admin.site.register(PrizePoolItem)
admin.site.register(PromoCode)
