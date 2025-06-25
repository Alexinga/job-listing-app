import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { authGuard } from './core/guard/auth.guard';
import { routes as childRoutes } from './core/routes/content-routes';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    title: 'Job Board Angular',
    canMatch: [authGuard],
    loadChildren: () =>
      import('./core/routes/content-routes').then((mod) => mod.routes),
    // children: childRoutes,
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];
