ARG MAPSERVER_VERSION="8.0.1"
ARG MAPCACHE_VERSION="1.14.0"
ARG NGINX_VERSION="1.26.0"

# --------------------------------------------------------------------------

FROM ubuntu:24.04 as builder

ARG MAPSERVER_VERSION
ARG MAPCACHE_VERSION
ARG NGINX_VERSION

LABEL org.opencontainers.image.authors="Gergo Gelencser <programmerg@gmail.com>"

USER root

# Install the dependencies

RUN apt update && \
    apt install -y --no-install-recommends \
        libfcgi-dev libgdal-dev libgeos-dev libproj-dev libcurl4-gnutls-dev libpcre3-dev \
        libpixman-1-dev libfreetype6-dev libfribidi-dev libharfbuzz-dev libexempi-dev \
        apache2-dev libapr1-dev libaprutil1-dev libprotobuf-c-dev protobuf-c-compiler \
        libpng-dev libjpeg-dev libgif-dev libtiff-dev libcairo2-dev libgd-dev \
        liblmdb-dev libpq-dev libsqlite3-dev libxml2-dev libxslt1-dev \
        cmake build-essential wget ca-certificates

COPY ./scripts/* /root/

RUN /root/build_mapserver.sh && \
    /root/build_mapcache.sh && \
    /root/build_nginx.sh

RUN apt remove -y cmake build-essential wget && \
    apt autoremove -y && \
    apt clean && \
    rm  -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
 
# Install application dependencies

# COPY --chown=www-data:www-data ./api/composer.json ./api/composer.lock /var/www/api/
# COPY --chown=www-data:www-data ./client/package.json ./client/package-lock.json /var/www/client/
# RUN composer install && npm ci && npm run prod

# --------------------------------------------------------------------------

FROM ubuntu:24.04 as base

ARG MAPSERVER_VERSION
ARG MAPCACHE_VERSION

LABEL org.opencontainers.image.authors="Gergo Gelencser <programmerg@gmail.com>"

# Install the dependencies

ENV DEBIAN_FRONTEND noninteractive

RUN apt update && \
    apt install -y --no-install-recommends \
        cgi-mapserver mapserver-bin mapcache-cgi libapache2-mod-mapcache mapcache-tools gdal-bin \
        apache2 libapache2-mod-fcgid nginx spawn-fcgi fcgiwrap php-fpm && \
    apt clean && \
    rm  -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Get the executables from builder

COPY --from=builder \
        /usr/local/bin/legend \
        /usr/local/bin/map2img \
        /usr/local/bin/mapserv \
        /usr/local/bin/msencrypt \
        /usr/local/bin/scalebar \
        /usr/local/bin/shptree \
        /usr/local/bin/coshp \
        /usr/local/bin/shptreetst \
        /usr/local/bin/shptreevis \
        /usr/local/bin/sortshp \
        /usr/local/bin/tile4ms \
        /usr/local/bin/mapcache.fcgi \
        /usr/local/bin/mapcache_detail \
        /usr/local/bin/mapcache_seed \
        /usr/bin/
COPY --from=builder /usr/local/lib/libmap* /usr/lib/
COPY --from=builder /usr/local/sbin/nginx /usr/sbin/nginx
COPY --from=builder /usr/lib/apache2/modules/mod_mapcache.so /usr/lib/apache2/modules/mod_mapcache.so

# Set up the configuration

RUN a2enmod alias authn_core authn_file auth_basic authz_core authz_host fcgid headers mapcache proxy_fcgi rewrite setenvif && \
    a2dismod -f access_compat authz_user autoindex filter status && \
    a2enconf php8.3-fpm && \
    a2disconf charset localized-error-pages other-vhosts-access-log security serve-cgi-bin && \
    rm -rf /var/www/html

COPY ./apache.conf /etc/apache2/sites-enabled/000-default.conf
COPY ./nginx.conf /etc/nginx/sites-enabled/default
COPY ./php.conf /etc/php/8.3/fpm/pool.d/www.conf

# Copy source code

COPY --chown=www-data:www-data . /var/www

# Start the server

ENV MAPSERVER_VERSION=${MAPSERVER_VERSION}
ENV MAPCACHE_VERSION=${MAPCACHE_VERSION}

EXPOSE 80 443

WORKDIR /var/www

# --------------------------------------------------------------------------

FROM base as apache

# APACHE_VERSION=$(apache2 -v | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
ENV WEBSERVER_NAME="Apache"
ENV WEBSERVER_VERSION="2.4.58" 

CMD ["sh", "-c", "apachectl -DFOREGROUND & php-fpm8.3 -F -R"]

# --------------------------------------------------------------------------

FROM base as nginx

ARG NGINX_VERSION
ENV WEBSERVER_NAME="NGINX"
ENV WEBSERVER_VERSION=${NGINX_VERSION}

CMD ["sh", "-c", "nginx -g 'daemon off;' & /etc/init.d/fcgiwrap start -f & php-fpm8.3 -F -R"]
