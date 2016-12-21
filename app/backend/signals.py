from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .utils import PrizePool, send_html_mail
from .models import PrizePoolItem, GooseRoll
from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMultiAlternatives

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
            htmly = get_template('gift_email.html')
            cntx = Context({'email': instance.customer.email, 'gift': instance.gift_descr})
            print('email_sending')
            send_html_mail(
                'Gift from ToonGoose',
                htmly.render(cntx),
                [instance.customer.email]
            )
            print('email_sent')
