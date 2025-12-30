import { Component } from '@angular/core';
import { DiceService, DiceRoll } from '../Services/dice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dice',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dice.html',
  styleUrl: './dice.css',
})
export class Dice {
  lastRoll?: DiceRoll;
  historyView: DiceRoll[] = [];

  constructor(private diceService: DiceService) {}

  rollDice() {
    this.lastRoll = this.diceService.rollInstant(100); // TODO can update this to allow rolling any valid dice [d2, d4, d6, d10, d12, d20, d100]
    const hist = this.diceService.getHistory();
    this.historyView = hist.slice(-5);
    return;
  }
}
