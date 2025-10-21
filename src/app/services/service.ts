import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) {}

  getAllUsers(){
    return this.http.get(`${environment.url}/api/users`, {});
  }
}
