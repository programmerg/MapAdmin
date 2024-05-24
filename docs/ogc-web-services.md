## OGC Web Services examples

### Web Feature Service (WFS)

Provides access to raw geospatial data objects

- http://localhost/mapserver/{workspace}/ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetCapabilities
- http://localhost/mapserver/{workspace}/ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=DescribeFeatureType&TYPENAME={layerName}
- http://localhost/mapserver/{workspace}/ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME={layerName}&CRS=epsg:{crs}&OUTPUTFORMAT=application/json&MAXFEATURES=100&PROPERTYNAME=id,name&FEATUREID=1

### Web Map Service (WMS)

Serves maps rendered from geospatial data

- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=DescribeLayer&LAYERS={layerName}&SLD_VERSION=1.1.0
- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetStyles&LAYERS={layerName}&SLD_VERSION=1.1.0
- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS={layerName}&STYLES={styleName}&CRS=epsg:{crs}&FORMAT=image/jpeg&BBOX={bbox}&WIDTH=250&HEIGHT=250
- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER={layerName}&STYLE={styleName}&FORMAT=image/jpeg&WIDTH=300&HEIGHT=50&SLD_VERSION=1.1.0
- http://localhost/mapserver/{workspace}/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS={layerName}&CRS=epsg:{crs}&INFO_FORMAT=application/json&BBOX={bbox}&WIDTH=250&HEIGHT=250&I={x}&J={y}

### Web Catalogue Service (WCS)

Performs searches for geospatial datasets and services

- http://localhost/mapserver/{workspace}/ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCapabilities
- http://localhost/mapserver/{workspace}/ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID={layerName}
- http://localhost/mapserver/{workspace}/ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&COVERAGEID={layerName}&TILEING=true&TILEHEIGHT=250&TILEWIDTH=250

### Web Map Tile Service (WMTS)

Serves pre-rendered map tiles

- http://localhost/mapserver/cache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities
- http://localhost/mapserver/cache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layerName}&STYLE={style}&TILEMATRIXSET={crs}&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&FORMAT=image/jpg
- http://localhost/mapserver/cache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetFeatureInfo

### Tile Map Service (TMS)

Providing simple urls to map tiles

- http://localhost/mapserver/cache/service/tms/1.0.0
- http://localhost/mapserver/cache/service/tms/1.0.0/{tilesetName}@EPSG:{crs}/{z}/{x}/{y}.png

### Sensor Observation Service (SOS)

Query real-time sensor data and sensor data time series

- http://localhost/mapserver/{workspace}/ows?SERVICE=SOS&VERSION=1.0.0&REQUEST=GetCapabilities
- http://localhost/mapserver/{workspace}/ows?SERVICE=SOS&VERSION=2.0.1&REQUEST=GetObservation&Offering={}&observedproperty={}&responseFormat={}

### Web Processing Service (WPS)

Executes geospatial processes

- ...

### OGC API

API building blocks to create, modify and query features on the Web

- http://localhost/mapserver/{workspace}/ogcapi/api?f=json
- http://localhost/mapserver/{workspace}/ogcapi/collections?f=json
- http://localhost/mapserver/{workspace}/ogcapi/collections/{collectionId}/items?f=json
- http://localhost/mapserver/{workspace}/ogcapi/collections/{collectionId}/items/{featureId}?bbox={bbox}&limit={limit}&start={start}
