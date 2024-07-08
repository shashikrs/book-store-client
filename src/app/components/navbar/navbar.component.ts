import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDrawer,
    MatToolbar,
    MatDrawerContainer,
    MatList,
    MatListItem,
    MatDivider,
    MatMenuModule,
  ],
})
export class NavbarComponent {
  path = '';
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  menuOpen = false; // Track menu open/close state

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateToBooks() {
    this.router.navigate(['/books']);
  }

  logout() {
    // Clear token and redirect to login
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
