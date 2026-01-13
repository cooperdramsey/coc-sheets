import { Injectable, inject } from '@angular/core';
import { DiceService, DiceGroup } from './dice.service';
import { InvestigatorStats } from '../enums/investigator-stats';
@Injectable({ providedIn: 'root' })
export class CharacteristicsService {
  private dice = inject(DiceService);

  // Map stat to its roll formula; keep as config later if desired
  private readonly formulaByStat: Record<InvestigatorStats, '3d6x5' | '(2d6+6)x5' | ''> = {
    [InvestigatorStats.STRENGTH]: '3d6x5',
    [InvestigatorStats.CONSTITUTION]: '3d6x5',
    [InvestigatorStats.DEXTERITY]: '3d6x5',
    [InvestigatorStats.APPEARANCE]: '3d6x5',
    [InvestigatorStats.POWER]: '3d6x5',
    [InvestigatorStats.SIZE]: '(2d6+6)x5',
    [InvestigatorStats.INTELLIGENCE]: '(2d6+6)x5',
    [InvestigatorStats.EDUCATION]: '(2d6+6)x5',
    [InvestigatorStats.LUCK]: '(2d6+6)x5',
    [InvestigatorStats.AGE]: ''
  };

  rollStat(stat: InvestigatorStats): { value: number; note: string; group: DiceGroup } {
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
