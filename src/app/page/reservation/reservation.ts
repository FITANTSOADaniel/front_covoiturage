import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { CookieService } from 'ngx-cookie-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, Toast],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css'
})
export class Reservation implements OnInit {

  reservations: any[] = [];
  error: string = '';
  user: any;
  title: string = '';
  subtitle: string = '';
  visible: boolean = false;
  reservationId= 0

  constructor(
    private service: Service,
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService
  ) {}

  showDialog(id: number) {
    this.reservationId = id
    this.visible = true;
  }
  ngOnInit(): void {
    this.loadUser();
    this.loadReservations();
    this.initTitles();
  }

  loadUser() {
    this.user = this.service.findUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  initTitles() {
    if (this.user?.isDriver) {
      this.title = 'Réservations sur mes trajets';
      this.subtitle = 'Consultez les passagers inscrits sur vos trajets';
    } else {
      this.title = 'Mes réservations';
      this.subtitle = 'Historique de vos trajets réservés';
    }
  }

  loadReservations() {
    if (!this.user) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    // 🔹 CONDUCTEUR
    if (this.user.isDriver) {
      this.service.getReservationsByDriver(this.user.id).subscribe({
        next: (data: any) => {
          this.reservations = data;
        },
        error: () => {
          this.error = 'Impossible de charger les réservations conducteur';
        }
      });
    }

    // 🔹 PASSAGER
    else {
      this.service.getReservationsByPassager(this.user.id).subscribe({
        next: (data: any) => {
          this.reservations = data;
          console.log(this.reservations)
        },
        error: () => {
          this.error = 'Impossible de charger vos réservations';
        }
      });
    }
  }
  Accepter(){
    this.service.accepter(this.reservationId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Réservation confirmée'
        });
        this.visible = false;
        this.loadReservations();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.message || 'Il y a une erreur'
        });
      }
    });
  }
}
