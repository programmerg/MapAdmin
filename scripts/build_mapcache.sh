#!/bin/sh

# Build MapCache from source
# https://mapserver.org/mapcache/install.html

set -e
cd /usr/local/src
wget -qO - https://download.osgeo.org/mapserver/mapcache-$MAPCACHE_VERSION.tar.gz | tar -xz
cd mapcache-$MAPCACHE_VERSION
mkdir build
cd build
cmake \
  -DCMAKE_BUILD_TYPE=Release \
  -DWITH_PIXMAN=ON \
  -DWITH_SQLITE=ON \
  -DWITH_BERKELEY_DB=OFF \
  -DWITH_LMDB=OFF \
  -DWITH_MEMCACHE=OFF \
  -DWITH_TIFF=OFF \
  -DWITH_TIFF_WRITE_SUPPORT=OFF \
  -DWITH_GEOTIFF=OFF \
  -DWITH_PCRE=OFF \
  -DWITH_MAPSERVER=OFF \
  -DWITH_POSTGRESQL=OFF \
  -DWITH_RIAK=OFF \
  -DWITH_GDAL=ON \
  -DWITH_MAPCACHE_DETAIL=ON \
  -DWITH_GEOS=ON \
  -DWITH_OGR=ON \
  -DWITH_CGI=ON \
  -DWITH_FCGI=ON \
  -DWITH_VERSION_STRING=ON \
  -DWITH_APACHE=ON \
  ..
make
make install

# BUGFIX: this line can be removed after 1.14.1 has been released
# https://github.com/MapServer/mapcache/pull/320/files
sed -i 's/ctx->cfg/ctx->config/g' /usr/local/src/mapcache-${MAPCACHE_VERSION}/nginx/ngx_http_mapcache_module.c
