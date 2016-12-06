import random

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.db import IntegrityError

from backend.models import GooseRoll, Customer
from .serializers import GooseRollSerializer, CustomerSerializer


class GooseRollViewSet(viewsets.ModelViewSet):
    serializer_class = GooseRollSerializer
    queryset = GooseRoll.objects.all()

    def list(self, request):
        queryset = GooseRoll.objects.all()
        serializer = GooseRollSerializer(queryset, many=True, context={'request': request})
        return Response(data=serializer.data)

    def retrieve(self, request, pk=None):
        roll = GooseRoll.objects.get(url=pk)
        if roll:
            serializer = GooseRollSerializer(roll)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        print(request)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


@api_view(['POST'])
def create_roll(request, format=None):

    parser_classes = (JSONParser,)

    if request.method == 'POST':
        if 'email' in request.data:
            try:
                customer = Customer.objects.create(email=request.data['email'])
                customer.save()
            except IntegrityError:
                return Response({'reason': 'duplicate'}, status=status.HTTP_400_BAD_REQUEST)
            url = random.randint(1, 99999999999999999999999999999999999)
            content = {
                'url': url,
                'prize1': 1,
                'prize2': 2,
                'selected': 0,
                'customer': customer
            }
            roll = GooseRoll.objects.create(**content)
            roll.save()
            return Response({'url': url}, status=status.HTTP_201_CREATED)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
