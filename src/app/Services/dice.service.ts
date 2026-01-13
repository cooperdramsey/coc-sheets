// dice.service.ts
import { Injectable } from '@angular/core';

export interface DiceRoll {
  sides: number;
  result: number;
  timestamp: number;
}

export interface DiceGroup {
  total: number;
  expression: string;
  timestamp: number;
  rolls: DiceRoll[];
}

@Injectable({ providedIn: 'root' })
export class DiceService {
  private groupHistory: DiceGroup[] = [];
  private readonly maxGroups = 5;

  /**
   * Roll multiple dice and return the grouped result with total and expression.
   * Also records the group in internal history.
   */
  rollGroup(requests: Array<{ sides: number; count: number }>): DiceGroup {
    const rolls: DiceRoll[] = [];
    const groupTimestamp = Date.now();

    for (const req of requests) {
      for (let i = 0; i < req.count; i++) {
        const result = Math.floor(Math.random() * req.sides) + 1;
        const roll: DiceRoll = { sides: req.sides, result, timestamp: groupTimestamp };
        rolls.push(roll);
      }
    }

    const group = this.addGroup(requests, rolls, groupTimestamp);
    return group;
  }

  private addGroup(
    requests: Array<{ sides: number; count: number }>,
    rolls: DiceRoll[],
    timestamp: number
  ): DiceGroup {
    const total = rolls.reduce((a, r) => a + r.result, 0);
    const expression = requests.map(r => `${r.count}d${r.sides}`).join(' + ');
    const group: DiceGroup = { total, expression, timestamp, rolls };
    this.groupHistory = [...this.groupHistory, group].slice(-this.maxGroups);
    return group;
  }

  getGroupHistory(): DiceGroup[] {
    return [...this.groupHistory];
  }

  clearHistory() {
    this.groupHistory = [];
  }
}
