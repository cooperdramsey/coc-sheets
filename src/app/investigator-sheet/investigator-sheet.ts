import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Investigator } from '../Models/investigator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { InvestigatorStateService } from '../Services/investigator-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investigator-sheet',
  imports: [MatCardModule, MatGridListModule, CommonModule],
  templateUrl: './investigator-sheet.html',
  styleUrl: './investigator-sheet.css',
})
export class InvestigatorSheet implements OnInit, OnDestroy {
  investigator: Investigator | null = null;
  private sub?: Subscription;

  constructor(private state: InvestigatorStateService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.state.current$.subscribe((inv) => {
      this.investigator = inv;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
