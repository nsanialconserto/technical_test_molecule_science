import { Component, effect, inject } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar'

import { SuperheroesStore } from '../../application/stores/superheroes.store'
import { CreateSuperheroDialog } from '../create-superhero-dialog/create-superhero-dialog'
import { Superhero, SuperheroCreationData } from '../../domain/models/superhero.model'

@Component({
    standalone: true,
    imports: [MatTableModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
    providers: [SuperheroesStore],
    selector: 'app-superheroes',
    templateUrl: './superheroes.html',
    styleUrl: './superheroes.css',
})
export class SuperheroesComponent {
    // Injections
    private readonly router = inject(Router);
    readonly store = inject(SuperheroesStore);
    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    readonly dataSource = new MatTableDataSource<Superhero>([]);

    displayedColumns = ['id', 'name', 'power']

    constructor() {
        effect(() => {
            this.dataSource.data = this.store.list();
        });

                // If store emit that the superhero has successfully been updated
        // Then open snackbar to inform user and reset flag to avoid repeated trigger 
        effect(() => {
            if (this.store.createSuccess()) {
                this.snackBar.open('super héro créé avec succès', 'Fermer', {
                    duration: 3000,
                });
                this.store.setCreateSuccess(false);
            }
        });
    }

    redirectSuperheorDetails(superheroId: string): void {
        this.router.navigate([`/superhero`, superheroId])
    }

    protected openCreateSuperheroDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        const dialogRef = this.dialog.open(CreateSuperheroDialog, {
            width: '500px',
            enterAnimationDuration,
            exitAnimationDuration
        });

        dialogRef.afterClosed().subscribe((superheroData: SuperheroCreationData) => {
            if (!superheroData) return;

            this.store.createSuperhero(superheroData);
        })
    }
}
