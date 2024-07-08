import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'; // Import JwtHelperService and JWT_OPTIONS
import { routes } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, HttpClientModule, ReactiveFormsModule),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // Provide JWT_OPTIONS
    JwtHelperService, // Provide JwtHelperService
  ],
};
