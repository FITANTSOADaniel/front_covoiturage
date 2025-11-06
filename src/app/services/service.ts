import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllUsers(){
    return this.http.get(`${environment.url}/api/users`, {});
  }

  //auth
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.url}/api/auth/login`, { email, password })
      .pipe(
        map((response) => {
        const token = response.token;

        if (token) {
          localStorage.setItem('sessionUser', token);
        } else {
          console.error('Aucun token reçu du backend.');
        }
        this.userSubject.next(response);

        return response;
      }
        )
      );
  }
  findUser(): any {
    try {
      const decodedToken = this.decodeToken();
      if (decodedToken) {
        const user: any = {
          id: decodedToken.sub,
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,
          is_admin: decodedToken.is_admin,
        };
        return user;
      } else {
        console.log(
          "Token introuvable"
        );
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token : ", error);
      return null;
    }
  }
  decodeToken(): any | null {
    try {
      const token = localStorage.getItem("sessionUser");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token : ", error);
      return null;
    }
  }
}
