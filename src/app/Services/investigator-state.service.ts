import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Investigator } from '../Models/investigator';

@Injectable({ providedIn: 'root' })
export class InvestigatorStateService {
  private _current = new BehaviorSubject<Investigator | null>(null);
  current$ = this._current.asObservable();
  private readonly storageKey = 'investigator-sheet';

  constructor() {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(this.storageKey) : null;
      if (raw) {
        const obj = JSON.parse(raw);
        const inv = Investigator.fromJSON(obj);
        this._current.next(inv);
      }
    } catch (err) {
      console.warn('Failed to restore investigator from storage', err);
    }
  }

  setCurrent(inv: Investigator | null) {
    this._current.next(inv);
    try {
      if (typeof window === 'undefined') return;
      if (inv) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(inv));
      } else {
        window.localStorage.removeItem(this.storageKey);
      }
    } catch (err) {
      console.warn('Failed to persist investigator to storage', err);
    }
  }

  get current(): Investigator | null {
    return this._current.value;
  }
}
