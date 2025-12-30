import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  // TODO pull rules like this into services
  private AGE_RULES = [
    { key: 'teen',   label: '15-19', min: 15, max: 19, penalty: 5, characteristics: ['STR', 'SIZ'], appReduction: 0, eduImprovements: 0},
    { key: 'adult',  label: '20-39', min: 20, max: 39, penalty: 0, characteristics: [], appReduction: 0, eduImprovements: 1},
    { key: 'middle', label: '40-49', min: 40, max: 49, penalty: 5, characteristics: ['STR', 'CON', 'DEX'], appReduction: 5, eduImprovements: 2},
    { key: 'older',  label: '50-59', min: 50, max: 59, penalty: 10, characteristics: ['STR', 'CON', 'DEX'], appReduction: 10, eduImprovements: 3},
    { key: 'senior', label: '60-69', min: 60, max: 69, penalty: 20, characteristics: ['STR', 'CON', 'DEX'], appReduction: 15, eduImprovements: 4},
    { key: 'elder',  label: '70-79', min: 70, max: 79, penalty: 40, characteristics: ['STR', 'CON', 'DEX'], appReduction: 20, eduImprovements: 4},
    { key: 'ancient',label: '80+',   min: 80, max: 120, penalty: 80, characteristics: ['STR', 'CON', 'DEX'], appReduction: 25, eduImprovements: 4}
  ];

  playerForm = this.fb.group({
      playerName: ['', Validators.required],
      characterName: ['', Validators.required],
      pronouns: [''],
      birthplace: [''],
      residence: ['']
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

  ageForm = this.fb.group({
    age: [0, [Validators.required, Validators.min(15), Validators.max(120)]],
  });

  occupationForm = this.fb.group({
      occupation: ['', Validators.required],
      skills: this.fb.array([this.createSkill()]),
    });

  backstoryForm = this.fb.group({
      backstory: [''],
      connections: [''],
    });

  wealthForm = this.fb.group({
      creditRating: [0],
      spendingLevel: [0],
      cash: [''],
      assets: [''],
    });

  get skills(): FormArray {
    return this.occupationForm.get('skills') as FormArray;
  }

  // Age helpers
  private getAgeBand(age: number) {
    return this.AGE_RULES.find(r => age >= r.min && age <= r.max);
  }

  get currentAgeBand() {
    const age = this.ageForm.get('age')?.value ?? 15;
    return this.getAgeBand(Number(age));
  }

  get ageAdvice(): string {
    const band = this.currentAgeBand;
    if (!band) return 'Select an age between 15 and 120.';
    var message = "";
    if (band.key == 'teen'){
      message += 'Deduct 5 points from STR or SIZ, and also from EDU. Roll twice for Luck and use the higher value.';
    } else {
      if (band.penalty > 0) {
        message += `Deduct ${band.penalty} points from `;
        const chars = band.characteristics;
        if (chars.length === 1) {
          message += chars[0];
        } else if (chars.length > 1) {
          const last = chars[chars.length - 1];
          const leading = chars.slice(0, -1).join(', ');
          message += `${leading}, or ${last} split in any way.`;
        }
      }

      if (band.appReduction > 0){
        message += ` Reduce APP by ${band.appReduction} points.`;
      }

      if (band.eduImprovements > 0){
        if (band.eduImprovements === 1){
          message += ` Make an improvement check for EDU.`;
        } else {
          message += ` Make ${band.eduImprovements} improvement checks for EDU.`;
        }
      }
    }
    return message;
  }
  // end age helpers

  createSkill(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      points: [0, [Validators.min(0)]],
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

finish(): void {
    const result = {
      info: this.playerForm.value,
      characteristics: {
        ...this.characteristicsForm.value,
        age: this.ageForm.value.age,
      },
      occupation: this.occupationForm.value,
      backstory: this.backstoryForm.value,
      wealth: this.wealthForm.value,
    };
    console.log('Investigator created:', result);
    // TODO: persist or navigate
  }
}
