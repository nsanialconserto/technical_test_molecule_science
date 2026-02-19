import { Component, inject } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

import { SuperheroesStore } from '../../application/stores/superheroes.store'

@Component({
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule, MatButtonModule],
  providers: [SuperheroesStore],
  selector: 'app-superheroes',
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css', 
})
export class SuperheroesComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperheroesStore);
  readonly dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'power']

  redirectSuperheorDetails(superheroId: string): void {
    this.router.navigate([`/superhero`, superheroId])
  }
}
