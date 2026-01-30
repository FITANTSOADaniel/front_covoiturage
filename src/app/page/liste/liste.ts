import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service } from './../../services/service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';


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
  imports: [CommonModule, CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './liste.html',
  styleUrls: ['./liste.css']
})
export class Liste {
  user: any
  from = '';
  to = '';
  date = '';
  error = '';
  rides: any= [];
  ride={
    id:0,
    depart: '',
    destination:'',
    freePlace: 0,
    price: 0,
  }
  reserve = false
  visible: boolean = false;
  selectedTrajetId!: number;
  nbPlaces: number = 1;
  userId = 1;
  constructor(
    private service: Service,
    private messageService: MessageService
  ){}


  showDialog(id: number, freePlaces: number) {
    this.ride.freePlace = freePlaces
    this.ride.id = id;
    this.visible = true;
  }

  ngOnInit() {
    this.loadAllRides();
  }

  loadAllRides() {
    this.rides = []
    this.error = ''
    this.service.getAllTrajet().subscribe({
      next: (data) => {
        this.rides = data
      },
      error: (err) => console.log(err) 
    });
  }

  handleSearch() {
    this.rides = []
    this.error = ''
    this.service.searchRides(this.from, this.to).subscribe({
      next: (data) => {
        this.rides = data;
        console.log(data)
        this.from = ''
        this.to = ''
        this.date = ''
      },
      error: () => {
        this.error = 'Aucun trajet trouvé';
      }
    });
  }
  reserver(){
    if(this.ride.freePlace < this.nbPlaces){
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Nombre de places insuffisant'});
    }
    this.user = this.service.findUser();
    const payload = {
      trajetId: this.ride.id,
      userId: this.user.id,
      nbPlaces: this.nbPlaces
    };

    this.service.reserverTrajet(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Réservation confirmée'
        });
        this.visible = false;
        this.loadAllRides();
        this.ride.id = 0
        this.ride.freePlace = 0
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.message || 'Impossible de réserver'
        });
      }
    });
  }
}
