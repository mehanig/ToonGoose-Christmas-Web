import random
from collections import Counter

from .utils import PrizePool

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.db import IntegrityError
from django.conf import settings
from backend.models import GooseRoll, Customer, PrizePoolItem
from .serializers import GooseRollSerializer, CustomerSerializer, GooseSecureSerializer
from .const import GOOSE_WINNERS_LIST_SIZE


class GooseRollViewSet(viewsets.ModelViewSet):
    serializer_class = GooseRollSerializer
    queryset = GooseRoll.objects.all()

    def list(self, request):
        queryset = GooseRoll.objects.all().exclude(selected=0).order_by('-id')[:GOOSE_WINNERS_LIST_SIZE]
        serializer = GooseSecureSerializer(queryset, many=True, context={'request': request})
        return Response(data=serializer.data)

    def retrieve(self, request, pk=None):
        roll = GooseRoll.objects.get(url=pk)
        if roll:
            serializer = GooseRollSerializer(roll)
            f = serializer.data
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
                customer = GooseRoll.objects.get(customer__email=request.data['email'])
                #Case: user closed page and want to finish selection with same email
                if customer and customer.selected == 0:
                    return Response({'url': customer.url},
                            status=status.HTTP_200_OK)
                return Response({'reason': 'duplicate'}, status=status.HTTP_400_BAD_REQUEST)
            url = str(random.randint(1, 9999999999999999999999999999999))
            prize1, prize2 = PrizePool().get_two_unique_items()
            content = {
                'url': url,
                'prize1': prize1,
                'prize2': prize2,
                'selected': 0,
                'customer': customer
            }
            roll = GooseRoll.objects.create(**content)
            roll.save()
            print("saving!")
            return Response({'url': url},
                            status=status.HTTP_201_CREATED)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def selected_prize(request, format=None):

    parser_classes = (JSONParser,)

    if request.method == 'POST' and 'id' in request.data:
        print(request.data)
        roll = GooseRoll.objects.filter(url=request.data['id']).first()
        if roll:
            roll.selected = request.data['selected']
            roll.save()
            print(roll.selected)
            ### TODO: It's possible to fail here, and roll will be saved! It's important to keep GooseRoll table
            ### TODO: in sync with PrizeRollItem! If this fails, rollback GooseRoll item!
            if roll.selected == 1:
                PrizePoolItem.objects.create(prize=roll.prize1, description=settings.PRIZES_LIST_RU[roll.prize1]).save()
            elif roll.selected == 2:
                PrizePoolItem.objects.create(prize=roll.prize2, description=settings.PRIZES_LIST_RU[roll.prize2]).save()
            return Response({'selected': request.data['selected']}, status=status.HTTP_202_ACCEPTED)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
