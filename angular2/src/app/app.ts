import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Cadastrar } from './cadastrar/cadastrar';
import { Entrar } from './entrar/entrar';
import { Rodape } from './rodape/rodape';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu, Cadastrar, Entrar, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular2');
}