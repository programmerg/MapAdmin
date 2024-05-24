# Install MapAdmin on existing enviroments

## Prerequisites

To use **MapAdmin**, the following software components must be installed on your enviroment:

- Apache 2 / Nginx
- PHP 7.0+
- GDAL/OGR 2.4+
- MapServer 7+
- MapCache

If you use Windows, they are usually installed with the [OSGeo4W](https://trac.osgeo.org/osgeo4w/) or [MS4W installer](https://ms4w.com/index.html).

## Download

Get the newest source code by downloading the archive at [releases](https://github.com/programmerg/mapadmin/releases) page.

Then extract the archive in the document root folder of your web server.

## Installation

If you use Apache, the **alias**, **fcgid**, **mapcache** and **rewrite** modules need to be enabled.

To do this, remove the `#` signs before the corresponding lines in the **httpd.conf** file.

```apache
LoadModule alias_module modules/mod_alias.so
LoadModule fcgid_module modules/mod_fcgid.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule mapcache_module "/ms4w/Apache/cgi-bin/mod_mapcache.dll"
```

Finally, insert the following lines at the end of your httpd.conf / virtual host definition file:

```apache
<Location /mapserver/ows>
		Require     all granted
		SetHandler  fcgid-script
		Options     ExecCGI
		SetEnv      MAPSERVER_CONFIG_FILE "/path/to/document/root/data_dir/mapserver.conf"
</Location>
ScriptAlias /mapserver/ows /usr/bin/mapserv

<Location /mapserver/cache/service>
		Require   	all granted
</Location>
MapCacheAlias /mapserver/cache/service "/path/to/document/root/data_dir/mapcache.xml"
```

You must reload Apache to make the change take effect.

Open [http://localhost/mapserver/web/](http://localhost/mapserver/web/) in your browser and check if it is working correctly.

## Enjoy!

You are ready to use **MapAdmin**.
