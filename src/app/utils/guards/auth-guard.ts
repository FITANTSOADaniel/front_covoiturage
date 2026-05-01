import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { Service } from './../../services/service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(
    private Service: Service,
    private cookieService: CookieService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> | boolean {
    // Vérifier d'abord le cookie directement
    const token = this.cookieService.get('sessionUser');
    if (token) {
      try {
        const user = JSON.parse(token);
        if (user && user.id) {
          return true;
        }
      } catch (e) {
        // Token invalide
      }
    }

    // Si pas de token valide, vérifier via le service
    const user = this.Service.findUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
