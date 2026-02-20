import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SuperheroDetailsStore } from '../../application/stores/superhero-details.store';

@Component({
    standalone: true,
    selector: 'app-superhero-details',
    imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule],
    providers: [SuperheroDetailsStore],
    templateUrl: './superhero-details.html',
    styleUrl: './superhero-details.css',
})
export class SuperheroDetails {
    // Injections
    readonly store = inject(SuperheroDetailsStore);
    private snackBar = inject(MatSnackBar);
    private router = inject(Router);

    // Inputs
    readonly superHeroId = input.required<string>();

    private superheroListUrl = '/';

    // FormGroup definition
    protected form = new FormGroup({
        name: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        power: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor() {
        // Retrive the curent superhero data's from ID 
        effect(() => {
            const id = this.superHeroId();
            if (id) {
                this.store.loadSuperheroById({ id });
            }
        });
        // Allow to show the values of the current superhero
        effect(() => {
            const hero = this.store.superhero();
            if (hero) {
                this.form.patchValue({
                    name: hero.name,
                    power: hero.power,
                });
            }
        });

        // If store emit that the superhero has successfully been updated
        // Then open snackbar to inform user and reset flag to avoid repeated trigger 
        effect(() => {
            if (this.store.updateSuccess()) {
                this.snackBar.open('super héro mit à jour avec succès', 'Fermer', {
                    duration: 3000,
                });
                this.store.setUpdateSuccess(false);

                this.router.navigate([this.superheroListUrl]);
            }
        });
    }

    protected updateSuperhero(): void {
        if (this.form.invalid) return;

        this.store.updateCurrentHero(this.form.getRawValue());
    }

    protected redirectSuperheroList(): void {
        this.router.navigate([this.superheroListUrl]);
    }
}
