from django.db.models.signals import post_save
from django.dispatch import receiver
from .utils import PrizePool
from .models import PrizePoolItem


## TODO: MAKE IT!
@receiver(post_save, sender=PrizePoolItem)
def update_prize_pool(sender, instance, *args, **kwargs):
    PrizePool().pop_one(instance.prize)
