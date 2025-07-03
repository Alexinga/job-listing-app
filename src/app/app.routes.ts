import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { authGuard } from './core/guard/auth.guard';
import { childRoutes } from './core/routes/content-routes';
import { authRedirectGuard } from './core/guard/authRedirect.guard';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canMatch: [authRedirectGuard],
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
      import('./core/routes/content-routes').then((mod) => mod.childRoutes),
    // children: childRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
