import { Routes } from '@angular/router'
import { PageNotFound } from './features/page-not-found/page-not-found.component'

export const appRoutes: Routes = [
    { path: 'superhero/:id', loadComponent: () => import('./features/superhero/ui/superhero-details/superhero-details-page.component').then(m => m.SuperheroDetailsPage) },
    { path: '', pathMatch: 'full', loadComponent: () => import('./features/superhero/ui/superheroes/superheroes.component').then(m => m.SuperheroesComponent) },
    { path: '**', component: PageNotFound }
]
