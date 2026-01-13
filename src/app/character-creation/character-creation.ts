import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvestigatorCharacteristics } from '../enums/investigator-characteristics';
import { MatCardModule } from "@angular/material/card";
import { CharacteristicsService } from '../Services/characteristics.service';
import { AgeService } from '../Services/age.service';

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
    MatTooltipModule,
    MatCheckboxModule,
    MatCardModule
],
  templateUrl: './character-creation.html',
  styleUrl: './character-creation.css',
})
export class CharacterCreation {
  private fb = inject(FormBuilder);
  private characteristicsService = inject(CharacteristicsService);
  private ageService = inject(AgeService);

  rollNotes: Partial<Record<'str' | 'con' | 'dex' | 'app' | 'pow' | 'siz' | 'int' | 'edu' | 'luck', string>> = {};

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

  // TODO move into configuration or service
  // Default skills list
  private DEFAULT_SKILLS = [
    { name: 'Accounting', points: 5 },
    { name: 'Anthropology', points: 1 },
    { name: 'Appraise', points: 5 },
    { name: 'Archaeology', points: 1 },
    { name: 'Art/Craft', points: 5 },
    { name: 'Charm', points: 15 },
    { name: 'Climb', points: 20 },
    { name: 'Disguise', points: 5 },
    { name: 'Elec. Repair', points: 10 },
    { name: 'Fast Talk', points: 5 },
    { name: 'Fighting (Brawl)', points: 25 },
    { name: 'Firearms (Handgun)', points: 20 },
    { name: 'Firearms (Rifle/Shotgun)', points: 25 },
    { name: 'First Aid', points: 30 },
    { name: 'History', points: 5 },
    { name: 'Intimidate', points: 15 },
    { name: 'Jump', points: 20 },
    { name: 'Language (Other)', points: 1 },
    { name: 'Law', points: 5 },
    { name: 'Library Use', points: 20 },
    { name: 'Listen', points: 20 },
    { name: 'Locksmith', points: 1 },
    { name: 'Mech. Repair', points: 10 },
    { name: 'Medicine', points: 1 },
    { name: 'Natural World', points: 10 },
    { name: 'Navigate', points: 10 },
    { name: 'Occult', points: 5 },
    { name: 'Persuade', points: 10 },
    { name: 'Pilot', points: 1 },
    { name: 'Psychoanalysis', points: 1 },
    { name: 'Psychology', points: 10 },
    { name: 'Ride', points: 5 },
    { name: 'Science', points: 1 },
    { name: 'Sleight of Hand', points: 10 },
    { name: 'Spot Hidden', points: 25 },
    { name: 'Stealth', points: 20 },
    { name: 'Survival', points: 10 },
    { name: 'Swim', points: 20 },
    { name: 'Throw', points: 20 },
    { name: 'Track', points: 10 }
  ]

  ngOnInit(): void {
    this.recalculatePoints();

    // Update points whenever characteristics change
    this.characteristicsForm.valueChanges.subscribe(() => this.recalculatePoints());

    // Optional: also recalc when occupation changes (if it affects the “additional” characteristic)
    this.occupationForm.get('occupation')?.valueChanges.subscribe(() => this.recalculatePoints());
  }

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
      occupationPoints: [0],
      personalInterestPoints: [0],
      skills: this.fb.array(this.DEFAULT_SKILLS.map(skill => this.fb.group({
        isProfessional: [false],
        name: [skill.name, Validators.required],
        points: [skill.points, [Validators.min(0)]]
      })))
    });

  backstoryForm = this.fb.group({
      backstory: [''],
      connections: [''],
    });

  wealthForm = this.fb.group({
      creditRating: [0],
      spendingLevel: [0],
      cash: [0],
      assets: [''],
    });

  get skills(): FormArray {
    return this.occupationForm.get('skills') as FormArray;
  }

  // Age helpers
  get currentAgeBand() {
    const age = this.characteristicsForm.get('age')?.value ?? 15;
    return this.ageService.getAgeBand(Number(age));
  }

  get ageAdvice(): string {
    const age = Number(this.characteristicsForm.get('age')?.value ?? 15);
    return this.ageService.getAgeAdvice(age);
  }
  // end age helpers

  // skll helpers
  createSkill(): FormGroup {
    return this.fb.group({
      isProfessional: [false],
      name: ['', Validators.required],
      points: [0, [Validators.min(0)]]
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number): void {
    if (index < 0 || index >= this.skills.length) return;
    this.skills.removeAt(index);
  }
  // end skill helpers

  // TODO various functions for computing rules stuff and derived values
  calculateHitPoints(): number {
    const con = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.CONSTITUTION);
    const siz = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.SIZE);
    return Math.floor((con + siz) / 10);
  }

  calculateSanityPoints(): number {
    const pow = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.POWER);
    return pow;
  }

  calculateMagicPoints(): number {
    const pow = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.POWER);
    return Math.floor(pow / 5);
  }

  calculateMoveRate(): number {
    const str = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.STRENGTH);
    const dex = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.DEXTERITY);
    const siz = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.SIZE);

    let move = 0;
    if (str < siz && dex < siz) move = 7;
    if (str >= siz || dex >= siz || (str === siz && dex === siz)) move = 8;
    if (str > siz && dex > siz) move = 9;

    const age = Number(this.characteristicsForm.get('age')?.value ?? 15);
    move += this.ageService.getMovePenalty(age);

    return move;
  }

  calculateDamageBuildDodgeValues(): { damage: string; build: number } {
    const str = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.STRENGTH);
    const siz = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.SIZE);
    const total = str + siz;
    var lookup = this.DAMAGE_BUILD_TABLE.find(r => total >= r.min && total <= r.max);
    let damage = lookup ? lookup.damage : '';
    let build = lookup ? lookup.build : 0;
    return { damage, build };
  }

  calculateDerivedSkills(): any {
    const dex = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.DEXTERITY);
    const edu = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.EDUCATION);
    var skills = [];

    // Cthulhu Mythos
    skills.push({ name: 'Cthulhu Mythos', points: 0 });

    // Dodge
    let dodgePoints = Math.floor(dex / 2);
    skills.push({ name: 'Dodge', points: dodgePoints });

    // Own Language
    skills.push({ name: 'Language (Own)', points: edu });

    return skills;
  }

  calculateOccupationSkillPoints(additionalCharacteristic: InvestigatorCharacteristics = InvestigatorCharacteristics.EDUCATION): number {
    const edu = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.EDUCATION);
    const additional = this.getCharacteristicValueFromForm(additionalCharacteristic);
    return (edu * 2) + (additional * 2);
  }

  calculatePersonalInterestSkillPoints(): number {
    const int = this.getCharacteristicValueFromForm(InvestigatorCharacteristics.INTELLIGENCE);
    return int * 2;
  }
  // end various functions

  private getCharacteristicValueFromForm(characterisitc: InvestigatorCharacteristics): number {
    switch (characterisitc) {
      case InvestigatorCharacteristics.STRENGTH:
        return this.characteristicsForm.get('str')?.value ?? 0;
      case InvestigatorCharacteristics.CONSTITUTION:
        return this.characteristicsForm.get('con')?.value ?? 0;
      case InvestigatorCharacteristics.SIZE:
        return this.characteristicsForm.get('siz')?.value ?? 0;
      case InvestigatorCharacteristics.DEXTERITY:
        return this.characteristicsForm.get('dex')?.value ?? 0;
      case InvestigatorCharacteristics.APPEARANCE:
        return this.characteristicsForm.get('app')?.value ?? 0;
      case InvestigatorCharacteristics.INTELLIGENCE:
        return this.characteristicsForm.get('int')?.value ?? 0;
      case InvestigatorCharacteristics.POWER:
        return this.characteristicsForm.get('pow')?.value ?? 0;
      case InvestigatorCharacteristics.EDUCATION:
        return this.characteristicsForm.get('edu')?.value ?? 0;
      default:
        return 0;
    }
  }

  private recalculatePoints(): void {
    const occ = this.calculateOccupationSkillPoints(); // pass a different characteristic if needed
    const pi = this.calculatePersonalInterestSkillPoints();
    this.occupationForm.patchValue(
      { occupationPoints: occ, personalInterestPoints: pi },
      { emitEvent: false }
    );
  }

  // Dice helpers
  rollStat(stat: 'str' | 'con' | 'dex' | 'app' | 'pow' | 'siz' | 'int' | 'edu' | 'luck'): void {
    const { value } = this.characteristicsService.rollStat(stat);
    this.characteristicsForm.get(stat)?.setValue(value);
    this.rollNotes[stat] = 'Rolled ' + value;
  }

  rollAllStats(): void {
    this.rollStat('str');
    this.rollStat('con');
    this.rollStat('siz');
    this.rollStat('dex');
    this.rollStat('app');
    this.rollStat('int');
    this.rollStat('pow');
    this.rollStat('edu');
    this.rollStat('luck');
  }

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
