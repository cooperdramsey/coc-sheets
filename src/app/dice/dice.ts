import { Component } from '@angular/core';
import { DiceService, DiceRoll, DiceGroup } from '../Services/dice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-dice',
  imports: [MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './dice.html',
  styleUrl: './dice.css',
})
export class Dice {
  lastRoll?: DiceRoll;
  historyView: DiceGroup[] = [];
  menuOpen = false;
  diceOptions: number[] = [2, 4, 6, 10, 12, 20, 100];

  selectedCounts: Record<number, number> = {};

  constructor(private diceService: DiceService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onFabClick() {
    if (!this.menuOpen) {
      this.menuOpen = true;
      return;
    }
    const requests = Object.entries(this.selectedCounts).map(([sides, count]) => ({
      sides: +sides,
      count: count as number,
    }));
    if (requests.length) {
      this.rollSelection(requests);
    } else {
      this.menuOpen = false;
    }
  }

  rollDice(sides: number = 100) {
    this.lastRoll = this.diceService.rollInstant(sides);
    this.refreshHistory();
    this.menuOpen = false;
  }

  addDie(sides: number) {
    this.selectedCounts[sides] = (this.selectedCounts[sides] ?? 0) + 1;
  }

  removeDie(sides: number) {
    if (!this.selectedCounts[sides]) return;
    const next = this.selectedCounts[sides] - 1;
    if (next <= 0) {
      delete this.selectedCounts[sides];
    } else {
      this.selectedCounts[sides] = next;
    }
  }

  private rollSelection(requests: Array<{ sides: number; count: number }>) {
    const rolls = this.diceService.rollMany(requests);
    this.lastRoll = rolls[rolls.length - 1];
    this.refreshHistory();
    this.selectedCounts = {};
    this.menuOpen = false;
  }

  private refreshHistory() {
    this.historyView = this.diceService.getGroupHistory();
  }
}
