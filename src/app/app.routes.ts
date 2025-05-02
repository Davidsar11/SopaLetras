import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'sopa',
    loadComponent: ()  => import('./pages/sopa-letras-page/sopa-letras-page.component'),
  },
  {
    path: '**',
    redirectTo: 'home'
  }


];
