import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/gestion-avance',
    pathMatch: 'full'
  },
  {
    path: 'gestion-avance',
    loadComponent: () => import('./gestion-avance/gestion-avance.component').then(m => m.GestionAvanceComponent)
  },
  {
    path: 'gestion-contenido',
    loadComponent: () => import('./gestion-contenido/gestion-contenido.component').then(m => m.GestionContenidoComponent)
  },
  {
    path: '**',
    redirectTo: '/gestion-avance'
  }
];

