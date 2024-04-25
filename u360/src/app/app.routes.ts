import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Main routes
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./views/users/users.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./views/sign-in/sign-in.routes').then((m) => m.routes),
  },
  {
    path: 'shell',
    loadChildren: () => import('./views/shell/shell.routes').then((m) => m.routes),
  },
  // Children routes
  // ...
  // Default route
  {
    path: '',
    redirectTo: 'shell',
    pathMatch: 'full',
  },
  // Not found route
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.routes').then((m) => m.routes),
  },
];
