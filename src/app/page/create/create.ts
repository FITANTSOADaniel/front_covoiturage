import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from './../../services/service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create',
  imports: [CommonModule, FormsModule,ToastModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  constructor(
    private service: Service,
    private messageService: MessageService
  ) {}
  user= {
    id:0,
    isDriver: null
  };

  trajet = {
    depart : '',
    destination: '',
    dateDepart: '',
    status: 'nouveau',
    freePlace : null,
    price: null,
    driver: {
      id: 0,
      isDriver: null
    }
  }
  

  handleSubmit() {
    this.user = this.service.findUser()
    this.trajet.driver = this.user
    if(this.trajet.depart === "" || this.trajet.destination === ""|| this.trajet.price===""|| this.trajet.freePlace===""){
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Veuillez remplir tous les champs', life: 3000 });
    }else{
      if(this.user.isDriver){
        this.service.addTrajet(this.trajet).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Trajet ajouté avec succès', life: 3000 });
          },
        (error: any) => {
          console.log("this is the error", error)
        }
      );
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Désolé vous n\'êtes pas conducteur', life: 3000 });
      }
  }}
}
