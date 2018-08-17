# Docker + Laravel + Vue JS (VueRouter, Vuex, Vuetify)
## Installation Guide
###### by Anthony Tailer
`OBS: this tutorial was made for Ubuntu 18.04 Desktop`

## (Un)Install Docker

* remove old versions
```console
$ sudo apt remove docker docker-engine docker.io
```
* Installing
* First, update your existing list of packages:
```console
$ sudo apt update
```

* Next, install a few prerequisite packages which let apt use packages over HTTPS:

```console
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

* Then add the GPG key for the official Docker repository to your system:
```console
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

* Add the Docker repository to APT sources:

```console
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

* Next, update the package database with the Docker packages from the newly added repo:

```console
$ sudo apt update
```

* Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:
```console
$ apt-cache policy docker-ce
```
* You'll see output like this, although the version number for Docker may be different:

```console
Output of apt-cache policy docker-ce
docker-ce:
  Installed: (none)
  Candidate: 18.03.1~ce~3-0~ubuntu
  Version table:
     18.03.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
Notice that docker-ce is not installed, but the candidate for installation is from the Docker repository for Ubuntu 18.04 (bionic).
```

Finally, install Docker:
```console
$ sudo apt install docker-ce
```
* Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it's running:
```console
$ sudo systemctl status docker
```

* Manage Docker as a non-root user
* If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:
```console
$ sudo groupadd docker
```
```console
$ sudo usermod -aG docker $USER
```

* To apply the new group membership, log out of the server and back in, or type the following:
```console
su - ${USER}
```

* Confirm that your user is now added to the docker group by typing:
 ```console
id -nG
```

## Install docker-compose command
```console
$ sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
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

* At the top, change the APP_CODE_PATH_HOST variable to this.
```
APP_CODE_PATH_HOST=../
```

* change the MYSQL_VERSION variable to:
```
MYSQL_VERSION=5.7
```

* If you get errors on run nginx probably you're running some application on your 80 PORT, on your host PC. You can change nginx's PORT on ``.env`` file too.
```
NGINX_HOST_HTTP_PORT=81
```

## Running containers

* inside laradock folder

```console
$ docker-compose up -d nginx mysql phpmyadmin redis workspace
```

## Access the workspace container
* inside laradock folder
```console
$ docker-compose run workspace bash
```
or
```console
$ docker-compose exec workspace bash
```

## Install and configure Laravel on workspace container
* inside laradock folder
```console
$ docker-compose run workspace bash
```
```console
$ root@workspace:/var/www# git clone https://github.com/AnthonyTailer/laravue-api-boilerplate.git {some-directory} 
$ root@workspace:/var/www# cd {some-directory}
$ root@workspace:/var/www# composer install
$ root@workspace:/var/www# cp .env.example .env
$ root@workspace:/var/www# php artisan key:generate
$ root@workspace:/var/www# chown laradock:laradock -R .
$ root@workspace:/var/www# exit

// out of container workspace bash

$ ~/docker/laradock# cd ..
$ ~/docker# cd {directory}
$ ~/docker# sudo chmod -R 777 storage bootstrap/cache
```

## Configure nginx

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

## Install and configure Vue JS on workspace container inside Laravel project
* inside laradock folder
```console
$ docker-compose run workspace bash
```
* install Vue JS with Vuex, Vue-Router and Vuetify packages
```console
$ root@workspace:/var/www# cd {laravel-project-directory}
$ root@workspace:/var/www# yarn
$ root@workspace:/var/www# exit
```

## If you can't run artisan migrate

edited laradock/.env, set MYSQL_VERSION from latest to 5.7

deleted ~/.laradock/mysql/ directory completely (Warning, This may delete your data ! )

then re-build docker-compose build mysql

docker-compose up -d mysql as usual 
