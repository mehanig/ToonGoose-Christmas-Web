"""
Django settings for djreact project.

Generated by 'django-admin startproject' using Django 1.9.3.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

with open(BASE_DIR + '/djreact/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'post_office',
    'django_ses',
    'backend',
    'rest_framework',
    'webpack_loader',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'djreact.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'djreact/templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djreact.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        # 'rest_framework.permissions.DjangoModelPermissions',
        'rest_framework.permissions.AllowAny',
        # 'rest_framework.parsers.JSONParser',
    ],
    'EXCEPTION_HANDLER': 'djreact.utils.custom_exception_handler',
}


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Email
# EMAIL_BACKEND = 'post_office.EmailBackend'
#
# POST_OFFICE = {
#     'LOG_LEVEL': 2,  # Log all
#     'BACKENDS': {
#         'default': 'django_ses.SESBackend',
#     }
# }
# EMAIL_BACKEND = 'django_ses.SESBackend'
#

EMAIL_BACKEND = 'django_mailgun.MailgunBackend'
MAILGUN_ACCESS_KEY = 'key-c82d31b31478acb965d6a95612c44526_invalidKey'
MAILGUN_SERVER_NAME = 'aeupdates.com'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'djreact/static'),
]

try:
    from .local_settings import *  # flake8: noqa
except ImportError:
    pass


PRIZES_LIST_RU = [
    "50% скидка на ролик (до 60 секунд)",
    "30% скидка на ролик (до 60 секунд)",
    "10% скидка на ролик (до 60 секунд)",
    "Бесплатный саунд-дизайн",
    "Бесплатная музыка",
    "Бесплатный сценарий",
    "Бесплатная раскадровка"
]

PRIZES_LIST_EN = [
    "50% skidka na video (up to 60 sec)",
    "30% skidka na video (up to 60 sec)",
    "10% skidka na video (up to 60 sec)",
    "Free саунд-дизайн",
    "Free музыка",
    "Free сценарий",
    "Free раскадровка"
]

from collections import namedtuple
PrizeProb = namedtuple('PrizeProb', ['prob', 'limit'])

# (percent of roll in dataset of 100, limit in database)
PRIZES_PROB = [
    PrizeProb(1, 1),
    PrizeProb(3, 3),
    PrizeProb(10, None),
    PrizeProb(5, 2),
    PrizeProb(5, 1),
    PrizeProb(10, 10),
    PrizeProb(15, None)
]