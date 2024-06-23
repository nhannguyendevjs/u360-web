import { Routes } from '@angular/router';
import { authChildGuard } from './guards/auth-child.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // ----------------------------------------------------------------
  // No auth routes
  // ----------------------------------------------------------------
  {
    path: '',
    loadComponent: () => import('./layouts/guest-layout/guest-layout.component').then((c) => c.GuestLayoutComponent),
    children: [
      {
        path: 'shell',
        title: 'Shell',
        loadComponent: () => import('./views/shell/shell.component').then((c) => c.ShellComponent),
      },
      {
        path: 'sign-in',
        title: 'Sign in',
        loadComponent: () => import('./views/sign-in/sign-in.component').then((c) => c.SignInComponent),
      },
      {
        path: '',
        redirectTo: 'shell',
        pathMatch: 'full',
      },
    ],
  },
  // ----------------------------------------------------------------
  // Auth routes
  // ----------------------------------------------------------------
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./views/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./views/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'users',
        title: 'Users',
        children: [
          {
            path: '',
            loadComponent: () => import('./views/users/users.component').then((c) => c.UsersComponent),
          },
          {
            path: 'create',
            loadComponent: () => import('./views/users/users.component').then((c) => c.UsersComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./views/users/users.component').then((c) => c.UsersComponent),
          },
          {
            path: 'delete/:id',
            loadComponent: () => import('./views/users/users.component').then((c) => c.UsersComponent),
          },
        ],
      },
      {
        path: 'kanban-board',
        title: 'Kanban board',
        loadComponent: () => import('./views/kanban-board/kanban-board.component').then((c) => c.KanbanBoardComponent),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./views/settings/settings.component').then((c) => c.SettingsComponent),
      },
    ],
  },
  // ----------------------------------------------------------------
  // Not found route
  // ----------------------------------------------------------------
  {
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./views/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];
