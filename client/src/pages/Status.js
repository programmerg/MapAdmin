import { LitElement, html } from 'lit';

export class Status extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <breadcrumbs-component 
      .navClass=${'pt-3 pb-2 mb-4 border-bottom fs-5'}
      .items=${[
        { url: '#', name: "Status" }
      ]}
    ></breadcrumbs-component>

    <h6>About</h6>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">MapAdmin</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="documentation" data-bs-toggle="router" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1" style="white-space: nowrap;">Server type</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="https://mapserver.org/" target="_blank" class="nav-link"><i class="ms ms-mapserver"></i> MapServer Suite</a>
            <!-- a href="http://geoserver.org/" target="_blank" class="nav-link"><i class="ms ms-geoserver"></i> GeoServer</a -->
            <!-- a href="https://qgis.org/" target="_blank" class="nav-link"><i class="ms ms-qgis"></i> QGIS Server</a -->
          </li>
        </ul>
      </li>
    </ul>

    <h6>Service Capabilities &amp; Status</h6>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WMS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.1.1&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.1</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WMS&amp;VERSION=1.3.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.3.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WFS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WFS&amp;VERSION=2.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">2.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WCS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=1.1.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.1.0</a>
          </li>
          <li class="nav-item">
            <a href="../ows?SERVICE=WCS&amp;VERSION=2.0.1&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">2.0.1</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">WMTS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../mapcache/service/wmts?SERVICE=WMTS&amp;VERSION=1.0.0&amp;REQUEST=GetCapabilities" target="_blank" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="flex-grow-1">TMS</span>
        <ul class="nav">
          <li class="nav-item">
            <a href="../mapcache/service/tms/1.0.0" target="_blank" class="nav-link">1.0.0</a>
          </li>
        </ul>
        <span class="badge text-bg-success rounded-pill">active</span>
      </li>
    </ul>
    `;
  }
}

customElements.define('status-page', Status);