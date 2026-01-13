import { Injectable, inject } from '@angular/core';
import { DiceService, DiceGroup } from './dice.service';

// Narrow stat type used in character creation
export type Stat = 'str' | 'con' | 'dex' | 'app' | 'pow' | 'siz' | 'int' | 'edu' | 'luck';

@Injectable({ providedIn: 'root' })
export class CharacteristicsService {
  private dice = inject(DiceService);

  // Map stat to its roll formula; keep as config later if desired
  private readonly formulaByStat: Record<Stat, '3d6x5' | '(2d6+6)x5'> = {
    str: '3d6x5',
    con: '3d6x5',
    dex: '3d6x5',
    app: '3d6x5',
    pow: '3d6x5',
    siz: '(2d6+6)x5',
    int: '(2d6+6)x5',
    edu: '(2d6+6)x5',
    luck: '(2d6+6)x5'
  };

  rollStat(stat: Stat): { value: number; note: string; group: DiceGroup } {
    const formula = this.formulaByStat[stat];
    if (formula === '3d6x5') {
      const group = this.dice.rollGroup([{ sides: 6, count: 3 }]);
      const value = group.total * 5;
      const note = `${group.expression} → ${group.total} × 5 = ${value}`;
      return { value, note, group };
    } else if (formula === '(2d6+6)x5') {
      const group = this.dice.rollGroup([{ sides: 6, count: 2 }]);
      const value = (group.total + 6) * 5;
      const note = `${group.expression} + 6 → ${(group.total + 6)} × 5 = ${value}`;
      return { value, note, group };
    } else
      throw new Error(`Unsupported formula: ${formula}`);
  }
}
