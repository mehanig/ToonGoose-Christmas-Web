from django.db import models
from django.conf import settings


class Customer(models.Model):
    email = models.EmailField(unique=True, db_index=True)

    def __str__(self):
        return 'Customer: ' + str(self.email)


class PrizePoolItem(models.Model):
    prize = models.IntegerField(db_index=True)
    description = models.CharField(max_length=256)


class GooseRoll(models.Model):
    url = models.CharField(max_length=32, db_index=True)
    selected = models.IntegerField(blank=True, default=0)  # 1 or 2, 0 == not selected
    prize1 = models.IntegerField()
    prize2 = models.IntegerField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    @property
    def prize1_descr(self):
        return settings.PRIZES_LIST_RU[int(self.prize1)]

    @property
    def prize2_descr(self):
        return settings.PRIZES_LIST_RU[int(self.prize2)]

    @property
    def gift_descr(self):
        if self.selected == 1:
            return self.prize1_descr
        if self.selected == 2:
            return self.prize2_descr
        return "No prize"

    @property
    def email_hidden(self):
        try:
            return "@".join(list(map(lambda x: x[0] + '***' + x[-1], self.customer.email.split('@'))))
        except Exception as e:
            return "***"

    @property
    def selected_descr(self):
        if self.selected == 1:
            return self.prize1_descr
        if self.selected == 2:
            return self.prize2_descr

    def __str__(self):
        return 'GooseRoll: ' + str(self.url)
