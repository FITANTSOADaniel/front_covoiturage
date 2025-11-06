import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
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
  canActivate(): boolean{
    let user = this.Service.findUser();
        
    if (user) {
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }
  
}
