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
    url(r'^app2/',
        generic.TemplateView.as_view(template_name='sample_app2.html')),
    url(r'^app1/',
        generic.TemplateView.as_view(template_name='sample_app.html')),
    url(r'^gifgun/',
        generic.TemplateView.as_view(template_name='gifgun.html')),
    url(r'^origami/',
        generic.TemplateView.as_view(template_name='main_page.html')),
    url(r'^goodparents/',
        generic.TemplateView.as_view(template_name='main_page.html')),
    url(r'^about/',
        generic.TemplateView.as_view(template_name='about.html')),

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/email/$', views.create_roll),
    url(r'^api/v1/prize-pool/$', views.prize_pool_list),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^$',
        generic.TemplateView.as_view(template_name='main_page.html')),
]
