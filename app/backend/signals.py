from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .utils import PrizePool
from .models import PrizePoolItem, GooseRoll
from django.core.mail import send_mail


## TODO: MAKE IT!
@receiver(post_save, sender=PrizePoolItem)
def update_prize_pool(sender, instance, *args, **kwargs):
    PrizePool().pop_one(instance.prize)


@receiver(post_save, sender=GooseRoll)
def send_email_with_gift(sender, instance, *args, **kwargs):
    print('sending')
    send_mail(
        'Subject here',
        'Here is the message.',
        'mehanig@gmail.com',
        ['mehanig@gmail.com'],
        fail_silently=False,
    )
    print('email_sent')
