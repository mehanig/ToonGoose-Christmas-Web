"""djreact URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views import generic

from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r'goose', views.GooseRollViewSet)
router.register(r'customer', views.CustomerViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/email/$', views.create_roll),
    url(r'^api/v1/selected_prize/$', views.selected_prize),
    url(r'^api/v1/prize-pool/$', views.prize_pool_list),
    url(r'^$', generic.TemplateView.as_view(template_name='main_page.html')),
]

urlpatterns += (url(r'^admin/django-ses/', include('django_ses.urls')),)
