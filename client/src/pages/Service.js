import { LitElement, html } from 'lit';

export class Service extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Services" }
      ]}
    ></breadcrumbs-component>

      <tab-component 
        .navClass=${'nav-fill'}
        .contentClass=${'pt-4'}
        .items=${[
          {id: 'general', label: 'General', active: true, content: html`
            <form-component .action=${"services/general"} .method=${"post"}>
              <fieldset class="mb-4">
                <legend class="h6">Metadata</legend>
                ${[
                    { label: "Title", type: "text", name: "title", value: "GeoServer Web Map Service" },
                    { label: "Abstract", type: "textarea", name: "abstract", value: "A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS" },
                    { label: "Fees", type: "text", name: "fees", value: "NONE" },
                    { label: "Access constraints", type: "text", name: "accessConstraints", value: "NONE" },
                    { label: "Keywords", type: "text", name: "keywords", value: "WFS,WMS,GEOSERVER" },
                    { label: "Online resource", type: "url", name: "onlineResource", value: "http://geoserver.org" },
                ].map(e => html`
                    <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .variant=${'horizontal'} .sizing=${'sm'} class="mb-3"></input-component>
                `)}
              </fieldset>
              <fieldset class="mb-4">
                <legend class="h6">Contact information</legend>
                ${[
                    { label: "Contact name", type: "text", name: "contactPerson", value: "" },
                    { label: "Organization", type: "text", name: "contactOrganization", value: "" },
                    { label: "Position", type: "text", name: "contactPosition", value: "" },
                    { label: "Email", type: "email", name: "contactEmail", value: "" },
                    { label: "Voice", type: "tel", name: "contactVoice", value: "" },
                    { label: "Fax", type: "tel", name: "contactFacsimile", value: "" },
                    { label: "Address type", type: "text", name: "addressType", value: "" },
                    { label: "Address", type: "text", name: "address", value: "." },
                    { label: "Address delivery point", type: "text", name: "addressDeliveryPoint", value: "" },
                    { label: "City", type: "text", name: "addressCity", value: "" },
                    { label: "State", type: "text", name: "addressState", value: "" },
                    { label: "ZIP code", type: "text", name: "addressPostalCode", value: "" },
                    { label: "Country", type: "text", name: "addressCountry", value: "" },
                ].map(e => html`
                    <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .variant=${'horizontal'} .sizing=${'sm'} class="mb-3"></input-component>
                `)}
              </fieldset>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-9">
                  <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
              </div>
            </form-component>
          `},
          {id: 'wms', label: 'WMS', content: html`
            <form-component .action=${"services/wms"} .method=${"post"}>
              <fieldset class="mb-4">
                <legend class="h6">Metadata</legend>
                ${[
                    { label: "Title", type: "text", name: "title", value: "GeoServer Web Map Service" },
                    { label: "Abstract", type: "textarea", name: "abstract", value: "A compliant implementation of WMS plus most of the SLD extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS" },
                    { label: "Fees", type: "text", name: "fees", value: "NONE" },
                    { label: "Access constraints", type: "text", name: "accessConstraints", value: "NONE" },
                    { label: "Keywords", type: "text", name: "keywords", value: "WFS,WMS,GEOSERVER" },
                    { label: "Online resource", type: "url", name: "onlineResource", value: "http://geoserver.org" },
                ].map(e => html`
                    <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .variant=${'horizontal'} .sizing=${'sm'} class="mb-3"></input-component>
              `)}
              </fieldset>
              <fieldset class="mb-4">
                <legend class="h6">Service specific settings</legend>
                ${[
                  { label: "Limited SRS list", txpe: "textarea", name: "srs", value: "" },
                  { label: "Output bounding box for every supported CRS", type: "checkbox", name: "bBOXForEachCRS", value: "" }, 
                  { label: "MIME types for a GetMap request", type: "select", name: "srs", multiple: true, rows: 3, options: [
                    { value: "application/atom+xml" },
                    { value: "application/json;type=utfgrid" },
                    { value: "application/pdf" },
                    { value: "application/rss+xml" },
                    { value: "application/vnd.google-earth.kml+xml" },
                    { value: "application/vnd.google-earth.kml+xml;mode=networklink" },
                    { value: "application/vnd.google-earth.kmz" },
                    { value: "image/geotiff" },
                    { value: "image/geotiff8" },
                    { value: "image/gif" },
                    { value: "image/jpeg" },
                    { value: "image/png" },
                    { value: "image/png; mode=8bit" },
                    { value: "image/svg+xml" },
                    { value: "image/tiff" },
                    { value: "image/tiff8" },
                    { value: "image/vnd.jpeg-png" },
                    { value: "image/vnd.jpeg-png8" },
                    { value: "text/html; subtype=openlayers" },
                    { value: "text/html; subtype=openlayers2" },
                    { value: "text/html; subtype=openlayers3" },
                  ] },
                  { label: "MIME types for a GetFeatureInfo request", type: "select", name: "srs", multiple: true, rows: 3, options: [
                    { value: "application/json" },
                    { value: "application/vnd.ogc.gml" },
                    { value: "application/vnd.ogc.gml/3.1.1" },
                    { value: "text/html" },
                    { value: "text/plain" },
                    { value: "text/xml" },
                    { value: "text/xml; subtype=gml/3.1.1" },
                  ]},
                  { label: "Disable usage of SLD and SLD_BODY parameters in GET requests and user styles in POST requests",  type: "checkbox", name: "dynamicStyling.disabled" }, 
              ].map(e => html`
                  <input-component .label=${e.label} .name=${e.name} .value=${e.value} .type=${e.type} .variant=${'horizontal'} .sizing=${'sm'} .multiple=${e.multiple} .rows=${e.rows} .options=${e.options} class="mb-3"></input-component>
              `)}
              </fieldset>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-9">
                  <button type="submit" class="btn btn-sm btn-primary">Save</button>
                </div>
              </div>
            </form-component>
          `},
          {id: 'wfs', label: 'WFS', content: html`
            
          `},
          {id: 'wcs', label: 'WCS', content: html`
            
          `},
          {id: 'wmts', label: 'WMTS', content: html`
            
          `},
          {id: 'tms', label: 'TMS', content: html`
            
          `},
        ]}
      ></tab-component>
    `;
  }
}

customElements.define('service-page', Service);