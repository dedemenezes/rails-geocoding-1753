import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';

// Connects to data-controller="map"
export default class extends Controller {
  static targets = []

  static values = {
    apiKey: String,
    markers: Array
  }
  connect() {
    console.log(this.markersValue)
    mapboxgl.accessToken = this.apiKeyValue;
    this.map = new mapboxgl.Map({
        container: this.element, // container ID
        center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 5000 })
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      // 1. Create the Mapbox Marker
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)

      const customMarker = document.createElement("div")
      customMarker.innerHTML = marker.marker_html
      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
      // 2. Set the lng and lat
      // 3. Add to the map
    })
  }
}
