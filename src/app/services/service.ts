import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  private users = [
    {
      id: 1,
      name: 'Rakoto',
      firstName: 'Jean',
      email: 'driver@example.com',
      password: 'driver123',
      phone: '0321234567',
      isAdmin: false,
      isDriver: true,
      isDeleted: false,
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Rabe',
      firstName: 'Marie',
      email: 'passenger@example.com',
      password: 'pass123',
      phone: '0327654321',
      isAdmin: false,
      isDriver: false,
      isDeleted: false,
      status: 'ACTIVE'
    }
  ];

  private trajets = [
    {
      id: 1,
      depart: 'Antananarivo',
      destination: 'Toamasina',
      dateDepart: '2026-05-20',
      price: 100000,
      freePlace: 3,
      driver: this.users[0],
      status: 'CONFIRME'
    },
    {
      id: 2,
      depart: 'Antananarivo',
      destination: 'Mahajanga',
      dateDepart: '2026-05-22',
      price: 120000,
      freePlace: 2,
      driver: this.users[0],
      status: 'CONFIRME'
    }
  ];

  private reservations = [
    {
      id: 1,
      trajetId: 1,
      trajet: this.trajets[0],
      passagerId: 2,
      passager: this.users[1],
      nbPlaces: 1,
      status: 'EN ATTENTE'
    }
  ];

  constructor(
    private cookieService: CookieService
  ) {
    this.userSubject.next(this.findUser());
  }

  login(email: string, password: string): Observable<any> {
    const user = this.users.find(
      u => u.email === email && u.password === password && !u.isDeleted
    );
    if (!user) {
      return throwError(() => ({ error: { message: 'Email ou mot de passe incorrect' } }));
    }

    const token = JSON.stringify(user);
    this.cookieService.set('sessionUser', token);
    this.userSubject.next(this.findUser());
    return of({ token });
  }

  register(data: any): Observable<any> {
    const existing = this.users.find(u => u.email === data.email);
    if (existing) {
      return throwError(() => ({ error: { message: 'Cet email est d�j� utilis�' } }));
    }

    const newUser = {
      ...data,
      id: this.users.length + 1,
      isDeleted: false,
      status: data.status || 'NEW'
    };
    this.users.push(newUser);
    return of(newUser);
  }

  logout() {
    this.cookieService.delete('sessionUser');
    this.userSubject.next(null);
  }

  findUser(): any {
    const token = this.cookieService.get('sessionUser');
    if (!token) return null;

    try {
      return JSON.parse(token);
    } catch {
      return null;
    }
  }

  addTrajet(data: any) {
    const newTrajet = {
      ...data,
      id: this.trajets.length + 1,
      status: data.status || 'NOUVEAU'
    };
    this.trajets.push(newTrajet);
    return of(newTrajet);
  }

  getAllTrajet() {
    return of(this.trajets.map(t => ({ ...t })));
  }

  searchRides(from: string, to: string): Observable<any> {
    const normalizedFrom = from?.trim().toLowerCase() || '';
    const normalizedTo = to?.trim().toLowerCase() || '';
    const results = this.trajets.filter(trajet => {
      const departMatch = normalizedFrom ? trajet.depart.toLowerCase().includes(normalizedFrom) : true;
      const destinationMatch = normalizedTo ? trajet.destination.toLowerCase().includes(normalizedTo) : true;
      return departMatch && destinationMatch;
    });
    return of(results);
  }

  getDetailsTrajet(id: any): any {
    const trajet = this.trajets.find(t => t.id === Number(id));
    return of(trajet || null);
  }

  reserverTrajet(data: any) {
    const voyage = this.trajets.find(t => t.id === Number(data.trajetId));
    const passager = this.users.find(u => u.id === Number(data.userId));
    if (!voyage || !passager) {
      return throwError(() => ({ error: { message: 'Trajet ou passager introuvable' } }));
    }
    if (voyage.freePlace < Number(data.nbPlaces)) {
      return throwError(() => ({ error: { message: 'Nombre de places insuffisant' } }));
    }
    voyage.freePlace -= Number(data.nbPlaces);
    const reservation = {
      id: this.reservations.length + 1,
      trajetId: voyage.id,
      trajet: voyage,
      passagerId: passager.id,
      passager,
      nbPlaces: Number(data.nbPlaces),
      status: 'EN ATTENTE'
    };
    this.reservations.push(reservation);
    return of(reservation);
  }

  getReservationsByDriver(driverId: number) {
    const result = this.reservations.filter(
      reservation => reservation.trajet.driver?.id === Number(driverId)
    );
    return of(result);
  }

  getReservationsByPassager(passagerId: number) {
    const result = this.reservations.filter(
      reservation => reservation.passagerId === Number(passagerId)
    );
    return of(result);
  }

  accepter(id: number) {
    const reservation = this.reservations.find(r => r.id === Number(id));
    if (!reservation) {
      return throwError(() => ({ error: { message: 'R�servation introuvable' } }));
    }
    reservation.status = 'ACCEPTEE';
    return of(reservation);
  }
}
