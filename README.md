Django + React boilerplate is taken from https://github.com/mbrochh/django-reactjs-boilerplate
Django uWSGI Docker is taken from https://github.com/dockerfiles/django-uwsgi-nginx

```
mkvirtualenv --python=`which python3` toongoose
pip install -r requirements.txt
npm install
./manage.py migrate
./manage.py runserver
```

```
node server.js
```

serves few static pages for now
but ready for implementing apps with react.


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

