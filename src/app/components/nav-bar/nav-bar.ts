import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service } from '../../services/service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit, OnDestroy {

  user: any = null;
  userSubscription!: Subscription;
  mobileMenuOpen = false;

  constructor(
    private router: Router,
    private service: Service,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userSubscription = this.service.user$.subscribe(user => {
      this.user = user;
    });
  }

  // 🔐 Déconnexion avec confirmation
  confirmLogout() {
    this.confirmationService.confirm({
      header: 'Déconnexion',
      message: 'Voulez-vous vraiment vous déconnecter ?',
      icon: 'pi pi-exclamation-triangle',
      closable: true,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      rejectButtonProps: {
          severity: 'secondary',
      },
      acceptButtonProps: {
        severity: 'info',
      },
      accept: () => {
        this.service.logout();
        this.closeMenu();
        this.router.navigate(['/'])

        this.messageService.add({
          severity: 'success',
          summary: 'Déconnecté',
          detail: 'Vous avez été déconnecté avec succès'
        });
      }
    });
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
  goTo(){
    this.router.navigate(['/reservation'])
  }
}
