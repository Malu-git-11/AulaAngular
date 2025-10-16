import { Component } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css'],
})
export class Mapa {}

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let userMarker: L.Marker<any> | null = null;
let userCircle: L.Circle<any> | null = null;

function success(position: GeolocationPosition) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = position.coords.accuracy;
  const latlon: L.LatLngTuple = [lat, lon];

  if (!userMarker) {
    map.setView(latlon, 16);
  }

  if (userMarker) {
    userMarker.setLatLng(latlon);
  } else {
    userMarker = L.marker(latlon).addTo(map).bindPopup("You're here!").openPopup();
  }

  if (userCircle) {
    userCircle.setLatLng(latlon).setRadius(accuracy);
  } else {
    userCircle = L.circle(latlon, { radius: accuracy }).addTo(map);
  }
}
function error() {}

if (navigator.geolocation) {
  const options = {
    enableHighAccuracy: true,
    setTimeout: 5000,
    maximunAge: 0,
  };
  navigator.geolocation.watchPosition(success, error, options);
} else {
  console.error('Seu navegador não suporta geolocalização');
}