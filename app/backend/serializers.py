from backend.models import GooseRoll, Customer
from rest_framework import serializers


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('email', )


class GooseRollSerializer(serializers.ModelSerializer):

    class Meta:
        model = GooseRoll
        fields = ('url', 'prize1', 'selected', 'prize2', 'customer', 'prize1_descr', 'prize2_descr')


class GooseSecureSerializer(serializers.ModelSerializer):

    class Meta:
        model = GooseRoll
        fields = ('selected', 'email_hidden')
