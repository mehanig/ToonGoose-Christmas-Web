from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .utils import PrizePool
from .models import PrizePoolItem, GooseRoll
from django.core.mail import send_mail


## TODO: MAKE IT!
@receiver(post_save, sender=PrizePoolItem)
def update_prize_pool(sender, instance, *args, **kwargs):
    if 'created' in kwargs and not kwargs['created']:
        PrizePool().pop_one(instance.prize)


@receiver(post_save, sender=GooseRoll)
def send_email_with_gift(sender, instance, *args, **kwargs):
    # Workaround because signal called twice: one for .create() and one for .save()
    if 'created' in kwargs and not kwargs['created']:
        if instance.selected in [1, 2] and instance.customer.email:
            print('email_sending')
            send_mail(
                'Email from ToonGoose',
                'Congratulations, {email}, you have gift from ToonGoose: {gift}'.format(email=instance.customer.email, gift=instance.gift_descr),
                'mehanig@gmail.com',
                [instance.customer.email],
                fail_silently=False,
            )
            print('email_sent')
