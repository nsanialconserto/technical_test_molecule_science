import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-superhero-dialog',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './create-superhero-dialog.html',
  styleUrl: './create-superhero-dialog.css',
})
export class CreateSuperheroDialog {
    readonly createSuperheroForm = new FormGroup({
        name: new FormControl<string>('', { nonNullable: true }),
        power: new FormControl<string>('', { nonNullable: true })
    })
}
