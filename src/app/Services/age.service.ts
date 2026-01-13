import { Injectable } from '@angular/core';
import { InvestigatorStats } from '../enums/investigator-stats';

export interface AgeBand {
  key: 'teen' | '20s or 30s' | '40s' | '50s' | '60s' | '70s' | '80+';
  label: string;
  min: number;
  max: number;
  penalty: number;
  characteristics: InvestigatorStats[];
  appReduction: number;
  eduImprovements: number;
}

@Injectable({ providedIn: 'root' })
export class AgeService {
  private readonly AGE_RULES: AgeBand[] = [
    { key: 'teen',   label: '15-19', min: 15, max: 19, penalty: 5,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.SIZE], appReduction: 0, eduImprovements: 0},
    { key: '20s or 30s',  label: '20-39', min: 20, max: 39, penalty: 0,
      characteristics: [], appReduction: 0, eduImprovements: 1},
    { key: '40s', label: '40-49', min: 40, max: 49, penalty: 5,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.CONSTITUTION, InvestigatorStats.DEXTERITY], appReduction: 5, eduImprovements: 2},
    { key: '50s',  label: '50-59', min: 50, max: 59, penalty: 10,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.CONSTITUTION, InvestigatorStats.DEXTERITY], appReduction: 10, eduImprovements: 3},
    { key: '60s', label: '60-69', min: 60, max: 69, penalty: 20,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.CONSTITUTION, InvestigatorStats.DEXTERITY], appReduction: 15, eduImprovements: 4},
    { key: '70s',  label: '70-79', min: 70, max: 79, penalty: 40,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.CONSTITUTION, InvestigatorStats.DEXTERITY], appReduction: 20, eduImprovements: 4},
    { key: '80+',label: '80+',   min: 80, max: 120, penalty: 80,
      characteristics: [InvestigatorStats.STRENGTH, InvestigatorStats.CONSTITUTION, InvestigatorStats.DEXTERITY], appReduction: 25, eduImprovements: 4}
  ];

  getAgeBand(age: number): AgeBand | undefined {
    return this.AGE_RULES.find(r => age >= r.min && age <= r.max);
  }

  getAgeAdvice(age: number): string {
    const band = this.getAgeBand(age);
    if (!band) return 'Select an age between 15 and 120.';
    let message = '';
    if (band.key === 'teen') {
      message += 'Deduct 5 points from STR or SIZ, and also from EDU. Roll twice for Luck and use the higher value.';
    } else {
      if (band.penalty > 0) {
        message += `Deduct ${band.penalty} points from `;
        const chars = band.characteristics;
        if (chars.length === 1) {
          message += String(chars[0]);
        } else if (chars.length > 1) {
          const last = chars[chars.length - 1];
          const leading = chars.slice(0, -1).join(', ');
          message += `${leading}, or ${last} split in any way.`;
        }
      }
      if (band.appReduction > 0) {
        message += ` Reduce APP by ${band.appReduction} points.`;
      }
      if (band.eduImprovements > 0) {
        message += band.eduImprovements === 1
          ? ` Make an improvement check for EDU.`
          : ` Make ${band.eduImprovements} improvement checks for EDU.`;
      }
    }
    return message;
  }

  isTeen(age: number): boolean {
    return this.getAgeBand(age)?.key === 'teen';
  }

  getMovePenalty(age: number): number {
    const key = this.getAgeBand(age)?.key;
    switch (key) {
      case '40s': return -1;
      case '50s': return -2;
      case '60s': return -3;
      case '70s': return -4;
      case '80+': return -5;
      default: return 0;
    }
  }
}
