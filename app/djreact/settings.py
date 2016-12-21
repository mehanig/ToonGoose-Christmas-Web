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
    'anymail',
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
        'NAME': os.path.join(BASE_DIR, 'database/db.sqlite3'),
    }
}

# WEBPACK_LOADER = {
#     'DEFAULT': {
#         'BUNDLE_DIR_NAME': 'bundles/',
#         'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json'),
#     }
# }

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

with open(BASE_DIR + '/djreact/secret_email_key.txt') as f:
    MAILGUN_ACCESS_KEY = f.read().strip()

ANYMAIL = {
    "MAILGUN_API_KEY": MAILGUN_ACCESS_KEY,
    "MAILGUN_SENDER_DOMAIN": 'toongoose.com'
}

EMAIL_BACKEND = "anymail.backends.mailgun.MailgunBackend"

DEFAULT_FROM_EMAIL = "hello@toongoose.com"

MAILGUN_SERVER_NAME = 'toongoose.com'

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
    "50% off the cost of the next animated video at ToonGoose  (for 90 sec video)",
    "30% off the cost of the next animated video at ToonGoose (for 90 sec video)",
    "10% off the cost of the next animated video at ToonGoose (for 90 sec video)",
    "free sound design for your next animated video at ToonGoose (for 90 sec video)",
    "free unique music track for your next animated video at ToonGoose (for 90 sec video)",
    "free script (2 options) for your next animated video at ToonGoose (for 90 sec video)",
    "free storyboard for your next animated video at ToonGoose (for 90 sec video)"
]

PRIZES_LIST_EN = [
    "50% off the cost of the next animated video at ToonGoose  (for 90 sec video)",
    "30% off the cost of the next animated video at ToonGoose (for 90 sec video)",
    "10% off the cost of the next animated video at ToonGoose (for 90 sec video)",
    "free sound design for your next animated video at ToonGoose (for 90 sec video)",
    "free unique music track for your next animated video at ToonGoose (for 90 sec video)",
    "free script (2 options) for your next animated video at ToonGoose (for 90 sec video)",
    "free storyboard for your next animated video at ToonGoose (for 90 sec video)"
]

from collections import namedtuple
PrizeProb = namedtuple('PrizeProb', ['prob', 'limit'])

# (percent of roll in dataset of 100, limit in database)
PRIZES_PROB = [
    PrizeProb(1, 5),
    PrizeProb(5, 20),
    PrizeProb(20, None),
    PrizeProb(10, 5),
    PrizeProb(15, 4),
    PrizeProb(14, 20),
    PrizeProb(35, None)
]