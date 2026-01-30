import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Service } from './../../services/service';
import { AlertService } from './../../services/alert.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, RouterModule],
  templateUrl: './register.html',
})
export class Register {
  statu: string = ""
  userBody = {
    name: "",
    firstName: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: false,
    isDriver: null,
    isDeleted: false,
    status: ""
  };

  constructor(
    private router: Router,
    private service: Service,
    private cookieService: CookieService,
    private statusService : AlertService,
    private messageService: MessageService
  ) {}

  register(){
    this.userBody.status = "NEW"
    this.service.register(this.userBody).subscribe(
      (token) => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Compte créer avec succès', life: 3000 });
        this.userBody.name= "",
        this.userBody.firstName= "",
        this.userBody.email= "",
        this.userBody.password= "",
        this.userBody.phone= "",
        this.userBody.isAdmin= false,
        this.userBody.isDriver= null,
        this.userBody.isDeleted= false,
        this.userBody.status= ""
      },
      (error: any) => {
        this.statu = this.statusService.getStatus();
      }
    );
  }
}
