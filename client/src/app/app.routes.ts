import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./features/superheroes/superheroes.component').then(m => m.SuperheroesComponent) }
]
