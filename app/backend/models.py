from django.db import models


class Customer(models.Model):
    email = models.EmailField(unique=True, db_index=True)

    def __str__(self):
        return 'Customer: ' + str(self.email)


class GooseRoll(models.Model):
    url = models.CharField(max_length=32, db_index=True)
    selected = models.IntegerField(blank=True, default=0)
    prize1 = models.IntegerField()
    prize2 = models.IntegerField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    @property
    def email_hidden(self):
        try:
            return "@".join(list(map(lambda x: x[0] + '***' + x[-1], self.customer.email.split('@'))))
        except Exception as e:
            return "***"

    def __str__(self):
        return 'GooseRoll: ' + str(self.url)
