import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Search } from '../search/search';

interface Ride {
  id: number;
  driver: string;
  rating: number;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
}

@Component({
  selector: 'app-test',
  imports: [CommonModule, Search],
  templateUrl: './liste.html',
  styleUrls: ['./liste.css']
})
export class Liste {
  mockRides: Ride[] = [
    {
      id: 1,
      driver: 'Marie D.',
      rating: 4.9,
      from: 'Paris',
      to: 'Lyon',
      date: '15 Oct 2025',
      time: '08:00',
      price: 25,
      seats: 3,
    },
    {
      id: 2,
      driver: 'Thomas L.',
      rating: 4.7,
      from: 'Marseille',
      to: 'Nice',
      date: '16 Oct 2025',
      time: '14:30',
      price: 15,
      seats: 2,
    },
    {
      id: 3,
      driver: 'Sophie M.',
      rating: 5.0,
      from: 'Bordeaux',
      to: 'Toulouse',
      date: '17 Oct 2025',
      time: '10:00',
      price: 18,
      seats: 4,
    },
  ];
}
