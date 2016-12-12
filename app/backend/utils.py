import random

from collections import Counter
from .models import PrizePoolItem
from django.conf import settings as s


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


# LIMITED TO 100
# Singleton for displaying stats
# Array of ints
class PrizePool(metaclass=Singleton):

    SIZE = 100

    def __init__(self):
        self.pool = []
        unlimited = []
        for item_index in range(len(s.PRIZES_LIST_RU)):
            if s.PRIZES_PROB[item_index].limit:
                c = PrizePoolItem.objects.filter(prize=item_index).count()
                if c < s.PRIZES_PROB[item_index].limit:
                    self.pool.extend([item_index] * (s.PRIZES_PROB[item_index].limit - c))
            else:
                unlimited.append(item_index)
        for item_index in unlimited:
            self.pool.extend([item_index] * s.PRIZES_PROB[item_index].prob)
        while len(self.pool) < self.SIZE:
            self.pool.append(random.choice(unlimited))
        random.shuffle(self.pool)

    def get_two_random_ids(self):
        int1, int2 = random.sample(range(0, self.SIZE), 2)
        return self.pool[int1], self.pool[int2]

    def get_two_unique_items(self):
        p1, p2 = self.get_two_random_ids()
        while p1 == p2:
            p1, p2 = self.get_two_random_ids()
            if len(Counter(self.pool).keys()) == 1:
                return p1, p2
        return p1, p2

    def pool_stat(self):
        c = Counter(self.pool)
        return [(s.PRIZES_LIST_RU[k], c[k]) for k in c]

    # def pool_stat_json(self):
    #     c = Counter()
    def pop_one(self, item):
        unlimited = []
        for item_index in range(len(s.PRIZES_LIST_RU)):
            if not s.PRIZES_PROB[item_index].limit:
                unlimited.append(item_index)
        try:
            self.pool[self.pool.index(item)] = random.choice(unlimited)
        except ValueError:
            print("No index: " + str(item))
        print(self.pool_stat())
