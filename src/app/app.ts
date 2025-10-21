import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NavBar } from './components/nav-bar/nav-bar';
import { Home } from './page/home/home';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [Home, NavBar, Hero, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('covoiturage');
}
