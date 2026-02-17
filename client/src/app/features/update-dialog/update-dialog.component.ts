import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Superhero } from '../superheroes/models/superhero.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './update-dialog.html',
  styleUrl: './update-dialog.css',
})
export class UpdateDialog {
  readonly form = new FormGroup({
    id: new FormControl<string>(this.data.id, { nonNullable: true }),
    name: new FormControl<string>(this.data.name, { nonNullable: true }),
    power: new FormControl<string>(this.data.power, { nonNullable: true }),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Superhero) { }
}