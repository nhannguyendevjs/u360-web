import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NavListComponent } from '../../components/nav-list/nav-list.component';
import { AppNavService } from '../../services/app-nav.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, NavListComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  appNavService = inject(AppNavService);
}
