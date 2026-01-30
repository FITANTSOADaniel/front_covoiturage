import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Import important
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';

// Importez votre intercepteur
import { authInterceptor } from './utils/interceptors/auth-interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    
    // Services PrimeNG (doivent être ici pour être injectables globalement)
    MessageService,
    ConfirmationService,

    // Configuration HTTP avec l'intercepteur fonctionnel
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: 'none' // 'none' désactive le mode sombre
          }
        }
    }),
  ]
};