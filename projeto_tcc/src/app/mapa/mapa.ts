import { Component, OnInit, ElementRef, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css'],
})
export class Mapa implements OnInit {
  public map!: L.Map;
  public userMarker: L.Marker<any> | null = null;
  public userCircle: L.Circle<any> | null = null;

  constructor(
    public el: ElementRef,
    @Inject(PLATFORM_ID) public platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializar o mapa quando estiver no navegador
      this.map = L.map(this.el.nativeElement.querySelector('#map')).setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      // Geolocalização
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        navigator.geolocation.watchPosition(
          (position) => this.success(position),
          (error) => this.error(error),
          options
        );
      } else {
        console.error('Seu navegador não suporta geolocalização');
      }
    }
  }

  public success(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const latlon: L.LatLngTuple = [lat, lon];

    if (!this.userMarker) {
      this.map.setView(latlon, 16);
    }

    if (this.userMarker) {
      this.userMarker.setLatLng(latlon);
    } else {
      this.userMarker = L.marker(latlon).addTo(this.map).bindPopup("You're here!").openPopup();
    }

    if (this.userCircle) {
      this.userCircle.setLatLng(latlon).setRadius(accuracy);
    } else {
      this.userCircle = L.circle(latlon, { radius: accuracy }).addTo(this.map);
    }
  }

  public error(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}