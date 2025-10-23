import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Register } from './page/register/register';
import { LoginComponent } from './page/login/login';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: Register },
    { path: '**', redirectTo: '' }
];
