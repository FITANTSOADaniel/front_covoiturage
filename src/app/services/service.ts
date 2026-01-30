import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.userSubject.next(this.findUser());
  }
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.url}/api/auth/login`, { email, password })
      .pipe(
        map(response => {
          const token = response.token;

          if (token) {
            this.cookieService.set('sessionUser', token);
            this.userSubject.next(this.findUser());
          }
          return response;
        })
      );
  }
  register(data: any): Observable<any> {
    return this.http.post(`${environment.url}/api/auth/register`, data);
  }

  logout() {
    this.cookieService.delete('sessionUser');
    this.userSubject.next(null);
  }

  // ================= USER =================

  findUser(): any {
    const token = this.cookieService.get('sessionUser');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return {
        email: decoded.sub,
        firstName: decoded.firstName,
        name: decoded.name,
        isDriver: decoded.isDriver,
        id: decoded.id
      };
    } catch {
      return null;
    }
  }

  addTrajet(data : any){
    return this.http.post(`${environment.url}/api/trajet`, data);
  }
  getAllTrajet(){
    return this.http.get(`${environment.url}/api/trajet`);
  }
  searchRides(from: string, to: string): Observable<any> {
    let params = new HttpParams()
      .set('from', from || '')
      .set('to', to || '');

    return this.http.get(`${environment.url}/api/trajet/search`, { params });
  }
  
  getDetailsTrajet(id: any): any {
    return this.http.get(`${environment.url}/api/trajet/${id}`, id);
  }

  reserverTrajet(data: any) {
    return this.http.post(
      `${environment.url}/api/reservations`,
      data
    );
  }

  getReservationsByDriver(driverId: number) {
    return this.http.get(
      `${environment.url}/api/reservations/driver/${driverId}`
    );
  }

  getReservationsByPassager(passagerId: number) {
    return this.http.get(
      `${environment.url}/api/reservations/passager/${passagerId}`
    );
  }
  accepter(id: number){
    return this.http.put(
      `${environment.url}/api/reservations/${id}`,
      ''
    );
  }
}
