import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class Documentation extends LitElement {

  constructor() {
    super();
    this.requestURI = undefined;
  }

  createRenderRoot() {
    return this;
  }

  handleRequest(e) {
    const serverType = location.pathname.split('/')[1];
    let requestURL = `${location.origin}/${serverType}/${e.target.value}`;
    switch (serverType) {
      case 'geoserver':
        requestURL = requestURL.replace('/mapcache', '/gwc');
        break;
      case 'qgisserver':
        requestURL = requestURL.replace('/mapcache/service/wmts', '/ows');
        break;
    }
    this.requestURI = requestURL;
    this.requestUpdate();
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Documentation" }
      ]}
    ></breadcrumbs-component>

    <h6>Endpoints</h6>
    <ul>
      <li>OGC Web Service: <a href="/mapserver/[workspace/]ows" class="text-decoration-none">/mapserver/[workspace/]ows</a></li>
      <li>Cache Service: <a href="/mapserver/mapcache/service/" class="text-decoration-none">/mapserver/mapcache/service/ows|wmts|tms</a></li>
      <li>REST interface: <a href="/mapserver/rest/" class="text-decoration-none">/mapserver/rest/</a></li>
      <li>Web interface: <a href="/mapserver/web/" class="text-decoration-none">/mapserver/web/</a></li>
    </ul>

    <h6>DEMO requests</h6>
    <div class="form-floating mb-3">
      <select id="demoRequestSelect" class="form-control form-select form-control-sm" @change="${this.handleRequest}">
        <option value=""></option>
        <optgroup label="WMS">
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=DescribeLayer&LAYERS=test&SLD_VERSION=1.1.0">DescribeLayer</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=test&STYLE=default&CRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=250&HEIGHT=250&FORMAT=image/png">GetMap</option>
          <option value="mapcache/service/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=test&STYLES=&FORMAT=image/jpeg&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=256&HEIGHT=256">GetMap trough cache</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=test&STYLE=default&FORMAT=image/png&SLD_VERSION=1.1.0&WIDTH=20&HEIGHT=20">GetLegendGraphic</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetStyles&LAYERS=test">GetStyles</option>
          <option value="ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=test&CRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=250&HEIGHT=250&QUERY_LAYERS=test&I=10&J=200&INFO_FORMAT=json">GetFeatureInfo</option>
        </optgroup>
        <optgroup label="WFS">
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=DescribeFeatureType&TYPENAME=test">DescribeFeatureType</option>
          <option value="ows?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=test&MAXFEATURES=10&OUTPUTFORMAT=application/json;subtype=geojson&PROPERTYNAME=id,name&FEATUREID=1">GetFeature</option>
        </optgroup>
        <optgroup label="WCS">
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCapabilities">GetCapabilities</option>
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=DescribeCoverage&COVERAGEID=test">DescribeCoverage</option>
          <option value="ows?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&CoverageID=test&COMPRESSION=LZW&TILING=true&TILEHEIGHT=256&TILEWIDTH=256">GetCoverage</option>
        </optgroup>
        <optgroup label="WMTS">
          <option value="mapcache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=test&STYLE=default&TILEMATRIXSET=WGS84&TILEMATRIX=6&TILEROW=31&TILECOL=65&FORMAT=image/png">GetTile</option>
        </optgroup>
        <optgroup label="TMS">
          <option value="mapcache/service/tms/1.0.0/test@WGS84/6/65/32.png">GetTile</option>
        </optgroup>
        <optgroup label="WMC">
          <option value="ows?REQUEST=GetMetadata&LAYER=test">GetMetadata</option>
        </optgroup>
        <optgroup label="REST">
          <option value="rest/">REST Interface</option>
        </optgroup>
        <optgroup label="WEB">
          <option value="web/">Web GUI</option>
        </optgroup>
      </select>
      <label for="demoRequestSelect">Select request type</label>
    </div>
        
    <div class="card bg-light mb-3">
      <div class="card-header text-secondary" style="font-size: small;">
        <a href=${this.requestURI ?? 'about:blank'} target="_blank" class="text-decoration-none text-secondary">
          ${unsafeHTML((this.requestURI ?? location.origin).replace(/(&|\?)([^=]+)=([^&]+)/g, ' $1 <span><span class="text-dark">$2</span>=$3</span>'))}
        </a>
      </div>
      <div class="card-body">
        <iframe src=${this.requestURI ?? 'about:blank'} frameborder="0" allowTransparency="true" class="w-100 border-0 m-0" style="height: 300px;"></iframe>
      </div>
    </div>
    `;
  }
}

customElements.define('documentation-page', Documentation);