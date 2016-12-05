FROM ubuntu:16.04
MAINTAINER mehanig <mehanig@gmail.com>

COPY django/ django/

RUN apt-get update && apt-get -y install -y python3-pip
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN apt-get install -y libffi-dev
RUN apt-get install -y python-dev
RUN apt-get update && apt-get install -y \
	git \
	python3 \
	python3-dev \
	python3-setuptools \
	python3-pip \
	nginx \
	supervisor \
	sqlite3 \
	nodejs \
	npm \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install uwsgi

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx-django.conf /etc/nginx/sites-available/default
COPY supervisor-app.conf /etc/supervisor/conf.d/

COPY . /home/docker/code/

COPY django/requirements.txt /home/docker/code/django/
RUN pip3 install -r /home/docker/code/django/requirements.txt

RUN npm install
RUN cd django && python3 manage.py migrate

# in another terminal:
#mv webpack.local-settings.js.sample webpack.local-settings.js
#node server.js

EXPOSE 80
CMD ["supervisord", "-n"]
