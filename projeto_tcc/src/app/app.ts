import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu'
import { Mapa } from './mapa/mapa';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Mapa],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto_tcc');
}