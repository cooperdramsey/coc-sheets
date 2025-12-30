// dice.service.ts
import { Injectable } from '@angular/core';

export interface DiceRoll {
  sides: number;
  result: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class DiceService {
  private history: DiceRoll[] = [];

  rollInstant(sides: number): DiceRoll {
    const result = Math.floor(Math.random() * sides) + 1;

    const roll: DiceRoll = {
      sides,
      result,
      timestamp: Date.now(),
    };

    this.history.push(roll);
    return roll;
  }

  // Roll multiple dice at once and push each to history.
  rollMany(requests: Array<{ sides: number; count: number }>): DiceRoll[] {
    const rolls: DiceRoll[] = [];
    const groupTimestamp = Date.now(); // tag a group with same timestamp
    for (const req of requests) {
      for (let i = 0; i < req.count; i++) {
        const result = Math.floor(Math.random() * req.sides) + 1;
        const roll: DiceRoll = {
          sides: req.sides,
          result,
          timestamp: groupTimestamp,
        };
        this.history.push(roll);
        rolls.push(roll);
      }
    }
    return rolls;
  }

  save(result: DiceRoll) {
    this.history.push(result);
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}
