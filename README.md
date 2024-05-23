# MapAdmin

**MapAdmin** is a web administration interface and a PHP wrapper around MapServer 
which allows to manipulate mapfiles in a RESTFul way. It has been developped to match as
close as possible the way the GeoServer REST API acts.

## Inspiration

- [GeoServer REST API](https://docs.geoserver.org/stable/en/user/rest)
- [Neogeo Technologies - MapServer Rest API](https://github.com/neogeo-technologies/mra)
- [Jonathan Beliën - MapFile Generator](https://github.com/jbelien/MapFile-Generator)

## Components

- Webserver (Apache / nginx)
- MapServer
- MapCache
- MapAdmin REST API
- MapAdmin Web client

## Supported OGC Web Services

- Web Feature Service (WFS)
- Web Map Service (WMS)
- Web Catalogue Service (WCS)
- Web Map Tile Service (WMTS)
- Tile Map Service (TMS)
- OGC API

[For detailed examples, visit the docs](docs/ogc-web-services.md)

## Usage

MapAdmin can be installed on almost any [existing apache + mapserver environment](docs/install-on-existing-enviroments.md).

Or conveniently as a new service using [docker](https://www.docker.com/get-started/).

### Build the Docker image

```sh
docker build \
  --target apache \
  --build-arg MAPSERVER_VERSION="8.0.1" \
  --build-arg MAPCACHE_VERSION="1.14.0" \
  --build-arg NGINX_VERSION="1.26.0" \
  -t mapserver:8.0-1.14-apache .
```

### Run the Docker container

```sh
docker run \
  -d -p 80:80 \
  -v "path/to/folder:/var/www/data_dir" \
  --name mapserver \
  mapserver:8.0-1.14-apache
```

### Execute commands in the container

```sh
docker exec \
  -it mapserver \
  mapcache_seed -c /var/www/data_dir/mapcache.xml -t "$tileSetName" -g "$gridName"
```
