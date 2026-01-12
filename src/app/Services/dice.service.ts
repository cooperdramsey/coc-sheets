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
  private history: DiceRoll[] = [];
  private groupHistory: DiceGroup[] = [];
  private readonly maxGroups = 5;

  rollInstant(sides: number): DiceRoll {
    const result = Math.floor(Math.random() * sides) + 1;
    const timestamp = Date.now();

    const roll: DiceRoll = { sides, result, timestamp };
    this.history.push(roll);

    this.addGroup([{ sides, count: 1 }], [roll], timestamp);
    return roll;
  }

  // Roll multiple dice at once and push each to history.
  rollMany(requests: Array<{ sides: number; count: number }>): DiceRoll[] {
    const rolls: DiceRoll[] = [];
    const groupTimestamp = Date.now();

    for (const req of requests) {
      for (let i = 0; i < req.count; i++) {
        const result = Math.floor(Math.random() * req.sides) + 1;
        const roll: DiceRoll = { sides: req.sides, result, timestamp: groupTimestamp };
        this.history.push(roll);
        rolls.push(roll);
      }
    }

    this.addGroup(requests, rolls, groupTimestamp);
    return rolls;
  }

  private addGroup(
    requests: Array<{ sides: number; count: number }>,
    rolls: DiceRoll[],
    timestamp: number
  ) {
    const total = rolls.reduce((a, r) => a + r.result, 0);
    const expression = requests.map(r => `${r.count}d${r.sides}`).join(' + ');
    const group: DiceGroup = { total, expression, timestamp, rolls };
    this.groupHistory = [...this.groupHistory, group].slice(-this.maxGroups);
  }

  getHistory(): DiceRoll[] {
    return [...this.history];
  }

  getGroupHistory(): DiceGroup[] {
    return [...this.groupHistory];
  }

  clearHistory() {
    this.history = [];
    this.groupHistory = [];
  }
}
