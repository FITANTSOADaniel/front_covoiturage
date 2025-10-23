import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

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
}
