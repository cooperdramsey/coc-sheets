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
