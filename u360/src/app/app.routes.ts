import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  //////////////////////////////////////////
  // No Auth Routes
  //////////////////////////////////////////
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./views/sign-in/sign-in.routes').then((m) => m.routes),
      },
      {
        path: 'shell',
        loadChildren: () => import('./views/shell/shell.routes').then((m) => m.routes),
      },
      {
        path: '',
        redirectTo: 'shell',
        pathMatch: 'full',
      },
    ],
  },
  //////////////////////////////////////////
  // Auth Routes
  //////////////////////////////////////////
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/settings/settings.routes').then((m) => m.routes),
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/users/users.routes').then((m) => m.routes),
          },
        ],
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./views/home/home.routes').then((m) => m.routes),
          },
        ],
      },
    ],
  },
  //////////////////////////////////////////
  // Not Found Route
  //////////////////////////////////////////
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.routes').then((m) => m.routes),
  },
];
