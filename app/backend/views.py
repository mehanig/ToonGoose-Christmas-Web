import random
from collections import Counter

from .utils import PrizePool

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.db import IntegrityError

from backend.models import GooseRoll, Customer
from .serializers import GooseRollSerializer, CustomerSerializer, GooseSecureSerializer


class GooseRollViewSet(viewsets.ModelViewSet):
    serializer_class = GooseRollSerializer
    queryset = GooseRoll.objects.all()

    def list(self, request):
        queryset = GooseRoll.objects.all().exclude(selected=0).order_by('-id')[:5]
        serializer = GooseSecureSerializer(queryset, many=True, context={'request': request})
        return Response(data=serializer.data)

    def retrieve(self, request, pk=None):
        roll = GooseRoll.objects.get(url=pk)
        if roll:
            serializer = GooseRollSerializer(roll)
            serializer.data['prize1'] = "OK"
            f = serializer.data
            f['prize1'] = "Залупа за воротник со скидкой 100%"
            f['prize2'] = "Редкая хуета без скидки!"
            return Response(f)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        print(request)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


@api_view(['GET'])
def prize_pool_list(request, format=None):

    parser_classes = (JSONParser,)

    if request.method == 'GET':
        c = Counter(PrizePool().pool_stat())
        data = sorted([k for k in c], key=lambda x: x[1])
        return Response(data, status=status.HTTP_200_OK)


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
            url = str(random.randint(1, 9999999999999999999999999999999))
            content = {
                'url': url,
                'prize1': 1,
                'prize2': 2,
                'selected': 0,
                'customer': customer
            }
            roll = GooseRoll.objects.create(**content)
            roll.save()
            print("saving!")
            return Response({'url': url},
                            status=status.HTTP_201_CREATED)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
