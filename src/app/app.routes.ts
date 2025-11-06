import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Register } from './page/register/register';
import { Liste } from './page/liste/liste';
import { LoginComponent } from './page/login/login';
import { GuardsGuard } from './utils/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: Register },
    { path: 'liste', component: Liste, canActivate: [GuardsGuard] },
    { path: '**', redirectTo: '' }
];
