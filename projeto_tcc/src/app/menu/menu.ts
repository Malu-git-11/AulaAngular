import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}


document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }
});

