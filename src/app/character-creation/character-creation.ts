import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-character-creation',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './character-creation.html',
  styleUrl: './character-creation.css',
})
export class CharacterCreation {
  private fb = inject(FormBuilder);

  // TODO pull rules like this into services
  private AGE_RULES = [
    { key: 'teen',   label: '15-19', min: 15, max: 19, penalty: 5, characteristics: ['STR', 'SIZ'], appReduction: 0, eduImprovements: 0},
    { key: '20s or 30s',  label: '20-39', min: 20, max: 39, penalty: 0, characteristics: [], appReduction: 0, eduImprovements: 1},
    { key: '40s', label: '40-49', min: 40, max: 49, penalty: 5, characteristics: ['STR', 'CON', 'DEX'], appReduction: 5, eduImprovements: 2},
    { key: '50s',  label: '50-59', min: 50, max: 59, penalty: 10, characteristics: ['STR', 'CON', 'DEX'], appReduction: 10, eduImprovements: 3},
    { key: '60s', label: '60-69', min: 60, max: 69, penalty: 20, characteristics: ['STR', 'CON', 'DEX'], appReduction: 15, eduImprovements: 4},
    { key: '70s',  label: '70-79', min: 70, max: 79, penalty: 40, characteristics: ['STR', 'CON', 'DEX'], appReduction: 20, eduImprovements: 4},
    { key: '80+',label: '80+',   min: 80, max: 120, penalty: 80, characteristics: ['STR', 'CON', 'DEX'], appReduction: 25, eduImprovements: 4}
  ];

  // TODO move into service or configuration
  private DAMAGE_BUILD_TABLE = [
    { min: 2, max: 64, damage: '-2', build: -2 },
    { min: 65, max: 84, damage: '-1', build: -1 },
    { min: 85, max: 124, damage: '0', build: 0 },
    { min: 125, max: 164, damage: '+1d4', build: 1 },
    { min: 165, max: 204, damage: '+1d6', build: 2 },
    { min: 205, max: 284, damage: '+2d6', build: 3 },
    { min: 285, max: 364, damage: '+3d6', build: 4 },
    { min: 365, max: 444, damage: '+4d6', build: 5 },
    { min: 445, max: 524, damage: '+5d6', build: 6 }
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
    edu: [0, [Validators.required, Validators.min(0)]],
    age: [15, [Validators.required, Validators.min(15), Validators.max(120)]],
    luck: [0, [Validators.required, Validators.min(0)]]
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
    const age = this.characteristicsForm.get('age')?.value ?? 15;
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

  // skll helpers
  createSkill(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      points: [0, [Validators.min(0)]]
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
  // end skill helpers

  // TODO various functions for computing rules stuff and derived values
  calculateHitPoints(): number {
    const con = this.characteristicsForm.get('con')?.value ?? 0;
    const siz = this.characteristicsForm.get('siz')?.value ?? 0;
    return Math.floor((con + siz) / 10);
  }

  calculateSanityPoints(): number {
    const pow = this.characteristicsForm.get('pow')?.value ?? 0;
    return pow;
  }

  calculateMagicPoints(): number {
    const pow = this.characteristicsForm.get('pow')?.value ?? 0;
    return Math.floor(pow / 5);
  }

  calculateMoveRate(): number {
    const str = this.characteristicsForm.get('str')?.value ?? 0;
    const dex = this.characteristicsForm.get('dex')?.value ?? 0;
    const siz = this.characteristicsForm.get('siz')?.value ?? 0;
    const ageBand = this.currentAgeBand;
    var move = 0;
    if (str < siz && dex < siz) {
      move = 7;
    }

    if (str >= siz || dex >= siz || str === siz && dex === siz) {
      move = 8;
    }

    if (str > siz && dex > siz) {
      move = 9;
    }

    // adjust for age penalties
    switch (ageBand?.key) {
      case '40s':
        move -= 1;
        break;
      case '50s':
        move -= 2;
        break;
      case '60s':
        move -= 3;
        break;
      case '70s':
        move -= 4;
        break;
      case '80+':
        move -= 5;
        break;
    }

    return move;
  }

  calculateDamageBuildDodgeValues(): { damage: string; build: number, dodge: number } {
    const str = this.characteristicsForm.get('str')?.value ?? 0;
    const siz = this.characteristicsForm.get('siz')?.value ?? 0;
    const dex = this.characteristicsForm.get('dex')?.value ?? 0;
    const total = str + siz;
    var lookup = this.DAMAGE_BUILD_TABLE.find(r => total >= r.min && total <= r.max);
    let damage = lookup ? lookup.damage : '';
    let build = lookup ? lookup.build : 0;
    let dodge = Math.floor(dex / 2);
    return { damage, build, dodge };
  }
  // end various functions

  finish(): void {
    const result = {
      info: this.playerForm.value,
      characteristics: this.characteristicsForm.value,
      occupation: this.occupationForm.value,
      backstory: this.backstoryForm.value,
      wealth: this.wealthForm.value,
    };
    console.log('Investigator created:', result);
    // TODO: persist or navigate
  }
}
