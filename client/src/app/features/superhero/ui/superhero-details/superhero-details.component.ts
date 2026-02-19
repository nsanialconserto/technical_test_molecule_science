import { Component, effect, inject, input } from '@angular/core';
import { SuperheroDetailsStore } from '../../application/stores/superhero-details.store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-superhero-details',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule],
  providers: [SuperheroDetailsStore],
  templateUrl: './superhero-details.html',
  styleUrl: './superhero-details.css',
})
export class SuperheroDetails {
    readonly store = inject(SuperheroDetailsStore);
    readonly superHeroId = input.required<string>();
    
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
        effect(() => {
            const id = this.superHeroId();
            if (id) {
                this.store.loadSuperhero({ id });
            }
        });

        effect(() => {
            const hero = this.store.superhero();
            if (hero) {
                this.form.patchValue({
                    name: hero.name,
                    power: hero.power,
                });
            }
        });
    }

    protected updateSuperhero(): void {
        if (this.form.invalid) return;

        this.store.updateCurrentHero(this.form.getRawValue());
    }
}
