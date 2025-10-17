import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common'; 
import { isPlatformBrowser } from '@angular/common';
import { Menu } from './menu/menu'
import { Mapa } from './mapa/mapa';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Mapa, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}