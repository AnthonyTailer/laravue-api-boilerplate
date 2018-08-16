# Docker + Laravel + Vue JS (VueRouter, Vuex, Vuetify)
## Installation Guide
###### by Anthony Tailer
`OBS: this tutorial was made for Ubuntu 18.04 Desktop`

## (Un)Install Docker

* remove old versions
```console
$ sudo apt remove docker docker-engine docker.io
```
* installing
```console
$ sudo apt-get update && sudo apt install docker-ce
```
```console
$ docker --version
```
```console
$ docker-compose --version
```
* Manage Docker as a non-root user
```console
$ sudo groupadd docker
```
```console
$ sudo usermod -aG docker $USER
```
## Install docker-compose command
```console
$ # curl -L https://github.com/docker/compose/releases/download/1.8.0/run.sh > /usr/local/bin/docker-compose
```
```console
$ chmod +x /usr/local/bin/docker-compose
```

## Install Laradock

* Clone this repository anywhere on your machine
```console
$ git clone https://github.com/laradock/laradock.git
```

* Editing configs
```console
$ cd laradock && cp env-example .env
```

* Edit this file
```console
$ sudo vim .env
```

* At the top, change the APP_CODE_PATH_HOST variable to your project path.
```
APP_CODE_PATH_HOST=../
```

## Run your containers
* inside laradock folder
```console
$ docker-compose up -d nginx mysql phpmyadmin redis workspace
```

* If you get errors on run nginx probably you're running some application on your 80 PORT, on your host PC. You can change nginx's PORT on ``.env`` file too.
```
NGINX_HOST_HTTP_PORT=81
```

## Access the workspace container
* inside laradock folder
```console
$ docker-compose run workspace bash
```
Ou
```console
$ docker-compose exec workspace bash
```

## Install and configure Laravel on workspace container
* inside laradock folder
```console
$ docker-compose run workspace bash
```
```console
$ root@workspace:/var/www# composer create-project laravel/laravel {directory} 
$ root@workspace:/var/www# cd {directory}
$ root@workspace:/var/www# composer install
$ root@workspace:/var/www# cp .env.example .env
$ root@workspace:/var/www# php artisan key:generate
$ root@workspace:/var/www# exit

$ ~/docker/laradock# cd ..
$ ~/docker# cd {directory}
$ ~/docker# sudo chmod -R 777 storage bootstrap/cache
```

## Install and configure Vue JS on workspace container inside Laravel project
* inside laradock folder
```console
$ docker-compose run workspace bash
```
* install Vue JS with Vuex, Vue-Router and Vuetify packages
```console
$ root@workspace:/var/www# cd {laravel-directory}
$ root@workspace:/var/www# yarn add vuex vue-router vuetify
$ root@workspace:/var/www# yarn
$ root@workspace:/var/www# exit
```

## Configure nginx for multiples projects

* Your folder structure should look like this:
```
+ laradock
+ project-1
+ project-2
```
* before you have to destroy the containers
```console
$ docker-compose down 
```

* on laradock folder

```console
$ ~/docker/laradock# cd nginx/sites
$ ~/docker/laradock/nginx/sites# cp laravel.conf.example lara-app.conf
$ ~/docker/laradock/nginx/sites# sudo vim lara-app.conf
```
* the file should look like this

```
server {
    listen 80;
    listen [::]:80;

    server_name lara-app.dev; # your choice
    root /var/www/lara-app/public; # has to be the public folder inside project
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }
}
```

* edit the /etc/hosts file
```console
$ sudo vim etc/hosts 
```
* add the alias for your application
```console
127.0.0.1       lara-app.dev 
```

* run the containers again on laradock folder
```console
$ docker-compose up -d nginx mysql phpmyadmin redis workspace
```

## If you can't rum artisan migrate

edited laradock/.env, set MYSQL_VERSION from latest to 5.7

deleted ~/.laradock/mysql/ directory completely (Warning, This may delete your data ! )

then re-build docker-compose build mysql

docker-compose up -d mysql as usual 
