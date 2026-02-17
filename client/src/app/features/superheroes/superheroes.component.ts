import { Component, inject } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

import { SuperheroesStore } from './superheroes.store'
import { UpdateDialog } from '../update-dialog/update-dialog.component'
import { Superhero } from './models/superhero.model'

@Component({
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule, MatButtonModule],
  selector: 'app-superheroes',
  template: `
    <div class="page">
      <div class="card">
        <h1 class="heading">Superhéros</h1>
        @if (store.isLoading()) {
          <div class="loading">
            <mat-spinner diameter="32" />
            <span>Chargement…</span>
          </div>
        }
        @if (store.error()) {
          <p class="error">{{ store.error() }}</p>
        }
        @if (!store.isLoading() && !store.error()) {
          <table mat-table [dataSource]="store.list()" class="hero-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>Id</th>
              <td mat-cell *matCellDef="let row">{{ row.id }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nom</th>
              <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>
            <ng-container matColumnDef="power">
              <th mat-header-cell *matHeaderCellDef>Pouvoir</th>
              <td mat-cell *matCellDef="let row">{{ row.power }}</td>
            </ng-container>
            <ng-container matColumnDef="updateBtn">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row">
                <button matButton="elevated" (click)="openDialog('500ms', '500ms', row)">Modifier</button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        }
      </div>
    </div>
  `,
  styles: [`
    .loading {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .hero-table {
      width: 100%;
    }
    .hero-table th {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `]
})
export class SuperheroesComponent {
  readonly store = inject(SuperheroesStore);
  readonly dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'power', 'updateBtn']

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: Superhero): void {
    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data,
    });

    dialogRef.afterClosed().subscribe((superhero?: Superhero) => {
      if (!superhero) return;

      this.store.updateHero({ id: superhero.id, input: { name: superhero.name, power: superhero.power }})
    })
  }
}
