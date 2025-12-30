import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-character-creation',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './character-creation.html',
  styleUrl: './character-creation.css',
})
export class CharacterCreation {
  private fb = inject(FormBuilder);

  playerForm = this.fb.group({
      playerName: ['', Validators.required],
      characterName: ['', Validators.required],
      pronouns: ['']
    });

    characteristicsForm = this.fb.group({
    str: [0, [Validators.required, Validators.min(0)]],
    con: [0, [Validators.required, Validators.min(0)]],
    siz: [0, [Validators.required, Validators.min(0)]],
    dex: [0, [Validators.required, Validators.min(0)]],
    app: [0, [Validators.required, Validators.min(0)]],
    int: [0, [Validators.required, Validators.min(0)]],
    pow: [0, [Validators.required, Validators.min(0)]],
    edu: [0, [Validators.required, Validators.min(0)]]
  });

  equipmentForm = this.fb.group({
    gear: [''],
    spendingLevel: [0, [Validators.required, Validators.min(0)]]
  });

  finish(): void {
    // TODO: integrate with investigator-state.service.ts
    console.log({
      ...this.playerForm.value,
      ...this.characteristicsForm.value,
      ...this.equipmentForm.value
    });
  }
}
