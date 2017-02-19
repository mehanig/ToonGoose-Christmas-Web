Django + React boilerplate is taken from https://github.com/mbrochh/django-reactjs-boilerplate
Django uWSGI Docker is taken from https://github.com/dockerfiles/django-uwsgi-nginx


#HOW TO START LOCALY

```
cd app
mkvirtualenv --python=`which python3` toongoose
pip install -r requirements.txt
npm install
mkdir database
./manage.py migrate
./manage.py runserver
```

```
node server.js
```

serves few static pages for now
but ready for implementing apps with react.

#HOW TO RUN IN PRODUCTION
- Build webpack for production
- change settings for production in `local_settings.py`
- update `secret_key.txt` if needed
- update `secret_email_key.txt` if needed
- update `promocodes.txt` and make `PROMOCODES_LIST` to read it
- build docker
- push docker
- run docker in GCE

####Build webpack for production
```
./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js
```

####Live Reload? 
Change settings in `local_settings.py`

####Deployment to Google Compute Engine:

Whole app is one Docker container, push it to google private registry
`docker build -t toongoseny .`
tag it
`docker tag toongoseny gcr.io/toongoseny/toongosenyimage`
push it
`gcloud docker -- push gcr.io/toongoseny/toongosenyimage`
don't set any permissons, it's private by default

Now create  Google Compute Engine using `startup-script.sh`


####Local run with uWSGI
```
$VIRTUAL_ENV/bin/uwsgi --ini uwsgi.ini:local --virtualenv $VIRTUAL_ENV
```


####Email problems?
```
python manage.py get_ses_statistics
```

