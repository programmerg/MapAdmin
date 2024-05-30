<?php 

namespace App;

use \MapFile\Parser\Map as MapFileParser;
use \MapFile\Writer\Map as MapFileWriter;

class MapFile {

  public static $defaultPath = "../data_dir/workspaces";

  public static function read ($workspaceId, $filePath = '') {
    $workspaceId = preg_replace('/^[a-zA-Z0-9\-]/g', '', $workspaceId);
    if ($filePath == '') $filePath = self::$defaultPath . "/$workspaceId.map";
    $parser = new MapFileParser();
    return $parser->parse($filePath);
  }

  public static function write ($workspaceId, $filePath = '') {
    $workspaceId = preg_replace('/^[a-zA-Z0-9\-]/g', '', $workspaceId);
    if ($filePath == '') $filePath = self::$defaultPath . "/$workspaceId.map";

    $workspace = (new \App\Model\Workspace())->find($workspaceId);

    $settings = [];
    foreach ((new \App\Model\Setting())->all() as $s) {
      $settings[$s['parameter']] = $s['value'];
    }
    
    // Create a new MapFile
    $map = new \MapFile\Model\Map();
    $map->name = $workspace->name;

    // Enviroment settings
    $map->config[] = 'MS_DEBUGLEVEL  1';
    $map->config[] = 'MS_ERRORFILE   "stderr"';
    $map->config[] = 'MS_TEMPPATH    "/tmp/mapserv/"';
    // $map->config[] = 'PROJ_LIB       "/usr/local/share/proj/"';
    // $map->fontset = "fonts/fonts.txt";
    // $map->symbolset = "symbols.map";
    
    // Projection settings
    $map->projection = 'epsg:3857'; # WebMercator
    // $map->projection = 'epsg:4326'; # WGS84
    // $map->projection = 'epsg:23700'; # HD72-EOV
    $map->extent = [-20026376.39, -20048966.10, 20026376.39, 20048966.10]; # WebMercator
    // $map->extent = [-180, -90, 180, 90]; # WGS84
    // $map->extent = [749308, 285203, 749830, 285490]; #EOV
    $map->units = 'meters';

    // Image settings
    $map->size = [256, 256];
    $map->maxsize = 4096;
    $map->imagetype = "png8";
    // $map->imagecolor = [255, 255, 255];

    // Query map definition for GetFeatureInfo "info_format=text/html" requests
    $map->querymap = new \MapFile\Model\QueryMap();
    $map->querymap->size = [200, 200];
    $map->querymap->color = [255, 255, 0];
    $map->querymap->style = 'HILITE';
    $map->querymap->status = 'ON';

    // Legend definition for GetLegendGraphic requests
    $map->legend = new \MapFile\Model\Legend();
    // $map->legend->imagecolor = [255, 255, 255];
    $map->legend->keyspacing = [10, 10];
    $map->legend->keysize = [12, 12];
    $map->legend->label = new \MapFile\Model\Label();
    $map->legend->label->type = 'BITMAP';
    $map->legend->label->size = 'MEDIUM';
    $map->legend->label->color = [20, 20, 20];
    $map->legend->status = 'OFF';
    
    // Scalebar definition
    // $map->scalebar = new \MapFile\Model\Scalebar();
    // $map->scalebar->imagecolor = [255, 255, 255];
    // $map->scalebar->size = [100, 2];
    // $map->scalebar->color = [20, 20, 20];
    // $map->scalebar->style = 1;
    // $map->scalebar->intervals = 2;
    // $map->scalebar->label = new \MapFile\Model\Label();
    // $map->scalebar->label->size = 'TINY';
    // $map->scalebar->label->color = [20, 20, 20];
    // $map->scalebar->units = 'METERS';
    // $map->scalebar->status = 'OFF';
    
    // Reference map definition
    // $map->reference = new \MapFile\Model\Reference();
    // $map->reference->size = [200, 200];
    // $map->reference->color = [0, 0, 0];
    // $map->reference->extent = [0, 0, 0, 0];
    // $map->reference->status = 'OFF';
    
    // Service definition
    $map->web = new \MapFile\Model\Web();
    // $map->web->browseformat = '';
    // $map->web->legendformat = '';
    // $map->web->queryformat = '';
    $map->web->metadata = [
      "ms_enable_modes"                   => "!*", # MAP TILE BROWSE LEGEND SCALEBAR
      "ows_onlineresource"                => APP_URL,
      "wms_onlineresource"                => APP_URL,
      "wfs_onlineresource"                => APP_URL.'?',
      "wcs_onlineresource"                => APP_URL,
      "sos_onlineresource"                => APP_URL,
      "oga_onlineresource"                => APP_URL,
      "tinyows_onlineresource"            => APP_URL,
    # "ows_allowed_ip_list"               => "",
    # "ows_denied_ip_list"                => "",
    # "ows_updatesequence"                => "0",
    # "oga_html_template_directory"       => 'share/ogcapi/templates/html-bootstrap4/',
      "tinyows_schema_dir"                => "/usr/local/share/tinyows/schema/",
      "tinyows_log"                       => "stderr",
      "tinyows_log_level"                 => "1",

      // Contact infos
      "ows_contactperson"                 => $settings['ows_contactperson'] ?? '',
      "ows_contactorganization"           => $settings['ows_contactorganization'] ?? '',
      "ows_contactposition"               => $settings['ows_contactposition'] ?? '',
      "ows_contactelectronicmailaddress"  => $settings['ows_contactelectronicmailaddress'] ?? '',
      "ows_contactvoicetelephone"         => $settings['ows_contactvoicetelephone'] ?? '',
      "ows_contactfacsimiletelephone"     => $settings['ows_contactfacsimiletelephone'] ?? '',
      "ows_addresstype"                   => $settings['ows_addresstype'] ?? '',
      "ows_address"                       => $settings['ows_address'] ?? '',
      "ows_city"                          => $settings['ows_city'] ?? '',
      "ows_stateorprovince"               => $settings['ows_stateorprovince'] ?? '',
      "ows_postcode"                      => $settings['ows_postcode'] ?? '',
      "ows_country"                       => $settings['ows_country'] ?? '',
      "ows_hoursofservice"                => $settings['ows_hoursofservice'] ?? '',
      "ows_contactinstructions"           => $settings['ows_contactinstructions'] ?? '',
      "ows_role"                          => $settings['ows_role'] ?? '',
      "ows_service_onlineresource"        => $settings['ows_service_onlineresource'] ?? "https://mapserver.org",

      // General
      "ows_enable_request"                => $settings['ows_enable_request'] ?? '!*',
      "ows_title"                         => $settings['ows_title'] ?? 'MapServer OGC Web Service',
      "ows_abstract"                      => $settings['ows_abstract'] ?? '',
      "ows_keywordlist"                   => $settings['ows_keywordlist'] ?? 'mapserver,wms,wfs,wcs',
      "ows_accessconstraints"             => $settings['ows_accessconstraints'] ?? 'NONE',
      "ows_fees"                          => $settings['ows_fees'] ?? 'NONE',
      "ows_srs"                           => $settings['ows_srs'] ?? "EPSG:4326 EPSG:3857 EPSG:900913",

      "ows_sld_enabled"                   => $settings['ows_sld_enabled'] ?? 'true',

      // WMS
      "wms_enable_request"                => $settings['wms_enable_request'] ?? '!*', # GetCapabilities, DescribeLayer, GetMap, GetFeatureInfo, GetLegendGraphic, GetStyles
      "wms_title"                         => $settings['wms_title'] ?? 'MapServer Web Map Service',
      "wms_abstract"                      => $settings['wms_abstract'] ?? '',
      "wms_keywordlist"                   => $settings['wms_keywordlist'] ?? 'mapserver,wms',
      "wms_accessconstraints"             => $settings['wms_accessconstraints'] ?? 'NONE',
      "wms_fees"                          => $settings['wms_fees'] ?? 'NONE',
      "wms_srs"                           => $settings['wms_srs'] ?? 'EPSG:4326 EPSG:3857 EPSG:900913',

      "wms_encoding"                      => $settings['wms_encoding'] ?? 'UTF-8',
      "wms_getmap_formatlist"             => $settings['wms_getmap_formatlist'] ?? 'png,png8,jpeg,jpeg-png,jpeg-png8,svg,pdf,kml,kmz,utfgrid,geotiff,geotiff16,xbil,application/openlayers',
      "wms_getlegendgraphic_formatlist"   => $settings['wms_getlegendgraphic_formatlist'] ?? 'png,png8,jpeg,jpeg-png,jpeg-png8,svg,pdf,kml,kmz,utfgrid,geotiff',
      "wms_getfeatureinfo_formatlist"     => $settings['wms_getfeatureinfo_formatlist'] ?? 'text/plain,application/vnd.ogc.gml,geojson,json,text/csv',
    # 'wms_feature_info_mime_type'        => 'text/html',
      "wms_layerlimit"                    => $settings['wms_layerlimit'] ?? '500',
      "wms_allow_getmap_without_styles"   => $settings['wms_allow_getmap_without_styles'] ?? 'true',
      "wms_rootlayer_name"                => '',

      // WFS
      "wfs_enable_request"                => $settings['wfs_enable_request'] ?? '!*', # GetCapabilities, DescribeFeatureType, GetFeature
      "wfs_title"                         => $settings['wfs_title'] ?? 'MapServer Web Feature Service',
      "wfs_abstract"                      => $settings['wfs_abstract'] ?? '',
      "wfs_keywordlist"                   => $settings['wfs_keywordlist'] ?? 'mapserver,wfs',
      "wfs_accessconstraints"             => $settings['wfs_accessconstraints'] ?? 'NONE',
      "wfs_fees"                          => $settings['wfs_fees'] ?? 'NONE',
      "wfs_srs"                           => $settings['wfs_srs'] ?? 'EPSG:4326 EPSG:3857 EPSG:900913',

      "wfs_encoding"                      => $settings['wfs_encoding'] ?? 'UTF-8',
      "wfs_getfeature_formatlist"         => $settings['wfs_getfeature_formatlist'] ?? 'ogrgml,geojson,json,csv,kml,kmz,shape-zip',
      "wfs_maxfeatures"                   => $settings['wfs_maxfeatures'] ?? '500000',
      "wfs_namespace_prefix"              => $settings['wfs_namespace_prefix'] ?? 'tows',
      "wfs_namespace_uri"                 => $settings['wfs_namespace_uri'] ?? 'http://www.mapserver.org/tinyows/',
      "tinyows_expose_pk"                 => $settings['tinyows_expose_pk'] ?? '1',
    # "wfs_return_srs_as_urn"             => 'false',

      // WCS
      "wcs_enable_request"                => $settings['wcs_enable_request'] ?? '!*', # GetCapabilities, DescribeCoverage, GetCoverage
      "wcs_label"                         => $settings['wcs_label'] ?? 'MapServer Web Coverage Service',
      "wcs_description"                   => $settings['wcs_description'] ?? '',
      "wcs_keywordlist"                   => $settings['wcs_keywords'] ?? 'mapserver,wcs',
      "wcs_accessconstraints"             => $settings['wcs_accessconstraints'] ?? 'NONE',
      "wcs_fees"                          => $settings['wcs_fees'] ?? 'NONE',

      // SOS
      "sos_enable_request"                => $settings['sos_enable_request'] ?? '!*', # GetCapabilities, DescribeSensor, GetObservation
      "sos_title"                         => $settings['sos_title'] ?? 'MapServer Sensor Observation Service',
      "sos_abstract"                      => $settings['sos_abstract'] ?? '',
      "sos_keywordlist"                   => $settings['sos_keywordlist'] ?? 'mapserver,sos',
      "sos_accessconstraints"             => $settings['sos_accessconstraints'] ?? 'NONE',
      "sos_fees"                          => $settings['sos_fees'] ?? 'NONE',
      "sos_srs"                           => $settings['sos_srs'] ?? 'EPSG:4326 EPSG:3857 EPSG:900913',

      "sos_maxfeatures"                   => $settings['sos_maxfeatures'] ?? '500000',

      // OGCAPI
      "oga_enable_request"                => $settings['oga_enable_request'] ?? '!*', # ogcapi
      "oga_description"                   => $settings['oga_description'] ?? '',
      "oga_keywords"                      => $settings['oga_keywords'] ?? 'mapserver,ogcapi',

      "oga_max_limit"                     => $settings['oga_max_limit'] ?? '500000',
    ];

    // Output format definitions
    $enabledOutputFormats = explode(',', $settings['outputformats'] ?? '');

    if (in_array('png', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "png";
      $outputformat->driver = "AGG/PNG";
      $outputformat->mimetype = "image/png";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "png";
      $outputformat->formatoption[] = "GAMMA=0.75";
      $map->outputformat->add($outputformat);
    }
    if (in_array('png8', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "png8";
      $outputformat->driver = "AGG/PNG8";
      $outputformat->mimetype = "image/png; mode=8bit";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "png";
      $outputformat->formatoption[] = "QUANTIZE_FORCE=on";
      $outputformat->formatoption[] = "QUANTIZE_COLORS=256";
      $outputformat->formatoption[] = "GAMMA=0.75";
      $map->outputformat->add($outputformat);
    }
    if (in_array('jpeg', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "jpeg";
      $outputformat->driver = "AGG/JPEG";
      $outputformat->mimetype = "image/jpeg";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "jpg";
      $outputformat->formatoption[] = "GAMMA=0.75";
      $map->outputformat->add($outputformat);
    }
    if (in_array('jpeg_png', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "jpeg_png";
      $outputformat->mimetype = "image/vnd.jpeg-png";
      $outputformat->driver = "AGG/MIXED";
      $outputformat->imagemode = "RGBA";
      $outputformat->formatoption[] = "TRANSPARENT_FORMAT=png";
      $outputformat->formatoption[] = "OPAQUE_FORMAT=jpeg";
      $map->outputformat->add($outputformat);
    }
    if (in_array('jpeg_png8', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "jpeg_png8";
      $outputformat->mimetype = "image/vnd.jpeg-png8";
      $outputformat->driver = "AGG/MIXED";
      $outputformat->imagemode = "RGBA";
      $outputformat->formatoption[] = "TRANSPARENT_FORMAT=png8";
      $outputformat->formatoption[] = "OPAQUE_FORMAT=jpeg";
      $map->outputformat->add($outputformat);
    }
    if (in_array('svg', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "svg";
      $outputformat->driver = "CAIRO/SVG";
      $outputformat->mimetype = "image/svg+xml";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "svg";
      $map->outputformat->add($outputformat);
    }
    if (in_array('pdf', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "pdf";
      $outputformat->driver = "CAIRO/PDF";
      $outputformat->mimetype = "application/pdf";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "pdf";
      $map->outputformat->add($outputformat);
    }
    if (in_array('geotiff', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "geotiff";
      $outputformat->driver = "GDAL/GTiff";
      $outputformat->mimetype = "image/tiff";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "tif";
      $map->outputformat->add($outputformat);
    }
    if (in_array('geotiff16', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "geotiff16";
      $outputformat->driver = "GDAL/GTiff";
      $outputformat->mimetype = "image/tiff";
      $outputformat->imagemode = "FLOAT32";
      $outputformat->extension = "tif";
      $map->outputformat->add($outputformat);
    }
    if (in_array('xbil', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "xbil";
      $outputformat->driver = "GDAL/ENVI";
      $outputformat->mimetype = "image/x-bil;bits=32";
      $outputformat->imagemode = "FLOAT32";
      $outputformat->extension = "bil";
      $outputformat->formatoption[] = "INTERLEAVE=BIL";
      $map->outputformat->add($outputformat);
    }
    if (in_array('aaigrid', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "aaigrid";
      $outputformat->driver = "GDAL/AAIGRID";
      $outputformat->mimetype = "image/x-aaigrid";
      $outputformat->imagemode = "INT16";
      $outputformat->extension = "grd";
      $outputformat->formatoption[] = "FILENAME=result.grd";
      $map->outputformat->add($outputformat);
    }
    if (in_array('kml', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "kml";
      $outputformat->driver = "KML";
      $outputformat->mimetype = "application/vnd.google-earth.kml+xml";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "kml";
      $outputformat->formatoption[] = "ATTACHMENT=result.kml";
      $outputformat->formatoption[] = "maxfeaturestodraw=100";
      $map->outputformat->add($outputformat);
    }
    if (in_array('kmz', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "kmz";
      $outputformat->driver = "KMZ";
      $outputformat->mimetype = "application/vnd.google-earth.kmz";
      $outputformat->imagemode = "RGB";
      $outputformat->extension = "kmz";
      $outputformat->formatoption[] = "ATTACHMENT=result.kmz";
      $map->outputformat->add($outputformat);
    }
    if (in_array('csv', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "csv";
      $outputformat->driver = "OGR/CSV";
      $outputformat->mimetype = "text/csv";
      $outputformat->formatoption[] = "LCO:GEOMETRY=AS_WKT";
      $outputformat->formatoption[] = "STORAGE=memory";
      $outputformat->formatoption[] = "FORM=simple";
      $outputformat->formatoption[] = "FILENAME=result.csv";
      $map->outputformat->add($outputformat);
    }
    if (in_array('shape-zip', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "shape-zip";
      $outputformat->driver = "OGR/ESRI Shapefile";
      $outputformat->formatoption[] = "STORAGE=memory";
      $outputformat->formatoption[] = "FORM=zip";
      $outputformat->formatoption[] = "FILENAME=result.zip";
      $map->outputformat->add($outputformat);
    }
    if (in_array('utfgrid', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "utfgrid";
      $outputformat->driver = "UTFGRID";
      $outputformat->mimetype = "application/json;type=utfgrid";
      $outputformat->formatoption[] = "LABELS=true";
      $outputformat->formatoption[] = "UTFRESOLUTION=4";
      $outputformat->formatoption[] = "DUPLICATES=false";
      $map->outputformat->add($outputformat);
    }
    if (in_array('geojson', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "geojson";
      $outputformat->driver = "OGR/GEOJSON";
      $outputformat->mimetype = "application/json;subtype=geojson";
      $outputformat->formatoption[] = "STORAGE=stream";
      $outputformat->formatoption[] = "FORM=SIMPLE";
      $outputformat->formatoption[] = "USE_FEATUREID=true";
      $map->outputformat->add($outputformat);
    }
    if (in_array('json', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "json";
      $outputformat->driver = "OGR/GEOJSON";
      $outputformat->mimetype = "application/json";
      $outputformat->formatoption[] = "STORAGE=stream";
      $outputformat->formatoption[] = "FORM=SIMPLE";
      $outputformat->formatoption[] = "USE_FEATUREID=true";
      $map->outputformat->add($outputformat);
    }
    if (in_array('mvt', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "mvt";
      $outputformat->driver = "MVT";
      $outputformat->extension = "pbf";
      $outputformat->formatoption[] = "EDGE_BUFFER=20";
      $outputformat->formatoption[] = "EXTENT=4096";
      $map->outputformat->add($outputformat);
    }
    if (in_array('gml', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "XML";
      $outputformat->driver = "OGR/GML";
      $outputformat->mimetype = "text/xml"; # used by WMS GetFeatureInfo request, not the WFS GetFeature requests
      $outputformat->formatoption[] = "STORAGE=stream";
      $outputformat->formatoption[] = "FORM=SIMPLE";
      $outputformat->formatoption[] = "USE_FEATUREID=true";
      $outputformat->formatoption[] = "DSCO:GML_ID=fid";
      $outputformat->formatoption[] = "DSCO:PREFIX=example";
      $outputformat->formatoption[] = "DSCO:XSISCHEMAURI=http://example.unknown.org";
      $map->outputformat->add($outputformat);
    }
    if (in_array('gml3', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();
      $outputformat->name = "OGRGML3";
      $outputformat->driver = "OGR/GML";
      $outputformat->mimetype = "text/xml; subtype=gml/3.1.1"; # used by WMS GetFeatureInfo request, not the WFS GetFeature requests
      $outputformat->formatoption[] = "STORAGE=stream";
      $outputformat->formatoption[] = "FORM=SIMPLE";
      $outputformat->formatoption[] = "USE_FEATUREID=true";
      $outputformat->formatoption[] = "DSCO:FORMAT=GML3Deegree";
      $outputformat->formatoption[] = "DSCO:GML_FEATURE_COLLECTION=YES";
      $outputformat->formatoption[] = "DSCO:PREFIX=example";
      $outputformat->formatoption[] = "DSCO:XSISCHEMA=EXTERNAL";
      $outputformat->formatoption[] = "DSCO:TARGET_NAMESPACE=http://example.unknown.org";
      $outputformat->formatoption[] = "DSCO:XSISCHEMAURI=http://example.unknown.org http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/gml.xsd";
      $map->outputformat->add($outputformat);
    }
    if (in_array('gml32', $enabledOutputFormats)) {
      $outputformat = new \MapFile\Model\OutputFormat();  
      $outputformat->name = "OGRGML32";
      $outputformat->driver = "OGR/GML";
      $outputformat->mimetype = "text/xml; subtype=gml/3.2.1"; # used by WMS GetFeatureInfo requests, not the WFS GetFeature requests
      $outputformat->formatoption[] = "STORAGE=stream";
      $outputformat->formatoption[] = "FORM=SIMPLE";
      $outputformat->formatoption[] = "USE_FEATUREID=true";
      $outputformat->formatoption[] = "DSCO:FORMAT=GML3.2";
      $outputformat->formatoption[] = "DSCO:GML_ID=wms.example.getfeatureinfo.collection";
      $outputformat->formatoption[] = "DSCO:GML_FEATURE_COLLECTION=YES";
      $outputformat->formatoption[] = "DSCO:PREFIX=example";
      $outputformat->formatoption[] = "DSCO:XSISCHEMA=EXTERNAL";
      $outputformat->formatoption[] = "DSCO:TARGET_NAMESPACE=http://example.unknown.org";
      $outputformat->formatoption[] = "DSCO:XSISCHEMAURI=http://example.unknown.org http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/gml/3.2 http://schemas.opengis.net/gml/3.2.1/gml.xsd";
      $map->outputformat->add($outputformat);
    }

    // Symbol definitions

    // layer definitions
    foreach ($workspace->layers as $l) {
      $layer = new \MapFile\Model\Layer();
      $layer->name = $l->name;
      $layer->connectiontype = ''; # OGR | POSTGIS | WMS | WFS
      $layer->connection = "host=192.168.19.110 port=5432 user=postgres password=SuperSecret dbname=platform";
      $layer->data = "filename | geom from example2 using unique id using srid=23700";
      $layer->type = $l->type; # LINE | POINT | POLYGON | RASTER
      $layer->processing = 'CLOSE_CONNECTION=DEFER';
      $layer->projection = 'epsg:4326';
      $layer->extent = [];
      $layer->encoding = 'UTF-8';
      $layer->metadata = [  
      # "ows_layer_group"         => '',
      # "ows_title"               => '',
        "ows_abstract"            => '',
        "ows_keywordlist"         => '',
        "ows_extent"              => '',
        "ows_srs"                 => 'EPSG:4326 EPSG:3857 EPSG:900913',
        "ows_geomtype"            => '', # Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection, Geometry, None
        "ows_include_items"            => "all", ## Optional (serves all attributes for layer)
        "gml_include_items"            => "all", ## Optional (serves all attributes for layer)
        "gml_exclude_items"            => "id",
        "gml_featureid"                => "id", ## REQUIRED
        "gml_geometries"               => "geom",
        "gml_geom_type"                => "line",
        "gml_types"                    => "auto",
        "tinyows_table"                => "example2",

        "wms_title"                    => "example1",
      # "wms_timeitem"            => 'datefield',
      # "wms_timeextent"          => '2004-01-01/2004-02-01',
      # "wms_timedefault"         => '2004-01-01',

        "wfs_title"                    => "example1",
        "wfs_use_default_extent_for_getfeature" => "false", ## improves performance of OGR layers
        "tinyows_retrievable"          => "1",
        "tinyows_writable"             => "1",

      # "wcs_label"               => '',
      # "wcs_resolution"          => '500 500',
      # "wcs_bandcount"           => '3',
      # "wcs_formats"             => 'geotiff16 aaigrid',
      # "wcs_nativeformat"        => 'raw binary',
      # "wcs_rangeset_name"       => '',
      # "wcs_rangeset_label"      => 'Bands',
      # "wcs_rangeset_axes"       => 'bands',

      # "sos_procedure"           "NS01EE0014",
      # "sos_offering_id"         "WQ1289",
      # "sos_observedproperty_id" "Water Quality",
      # "sos_describesensor_url"  "http://some/url/NS01EE0014.xml",

      # "oga_title"               => '',
      ];
      $layer->template = 'void'; # required for WMS GetFeatureInfo, OGCAPI
      $layer->status = 'ON'; # required for WMS GetLegendGraphic
      $layer->dump = 'TRUE'; # required for WMS GetFeatureInfo, WFS-T - enables gml output
      $map->layer->add($layer);
    }

    // Save the map file
    $writer = new MapFileWriter($map);
    return $writer->save($filePath);
  }
  
  public static function update (Request $request) {
    $props = (object)$request->getBody();
    if (isset($props->name)) {
      self::write($props->name);
    }
  }

  public static function updateAll() {
    $workspaces = new \App\Model\Workspace();
    foreach ($workspaces->all() as $workspace) {
      self::write($workspace->name);
    }
  }
  
  public static function delete ($workspaceId, $filePath = '') {
    $workspaceId = preg_replace('/^[a-zA-Z0-9\-]/g', '', $workspaceId);
    if ($filePath == '') $filePath = self::$defaultPath . "/$workspaceId.map";
    return unlink($filePath);
  }

}
