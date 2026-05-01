import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Service } from './../../services/service';
import { AlertService } from './../../services/alert.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
templateUrl: './login.html',
})
export class LoginComponent {
  email = 'driver@example.com';
  password = 'driver123';
  status: string = ""

  constructor(
    private router: Router,
    private service: Service,
    private cookieService: CookieService,
    private statusService : AlertService
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.email || !this.password) {
      alert('⚠️ Veuillez remplir tous les champs');
      return;
    }

    // Simulation de connexion
    alert('✅ Connexion réussie ! Bienvenue sur CovoitGo');

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
  login(){
    this.service.login(this.email, this.password).subscribe(
      (token) => {
        this.router.navigate(['/liste']);
      },
      (error: any) => {
        this.status = this.statusService.getStatus();
      }
    );
  }
}
