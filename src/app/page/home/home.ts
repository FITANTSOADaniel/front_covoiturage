import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Hero, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
