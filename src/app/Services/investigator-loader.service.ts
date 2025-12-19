import { Injectable } from '@angular/core';
import { Investigator } from '../Models/investigator';

@Injectable({ providedIn: 'root' })
export class InvestigatorLoaderService {
  async parseFile(file: File): Promise<Investigator> {
    const text = await file.text();
    return this.parseText(text);
  }

  parseText(jsonText: string): Investigator {
    let obj: unknown;
    try {
      obj = JSON.parse(jsonText);
    } catch {
      throw new Error('Invalid JSON');
    }
    return this.parseObject(obj);
  }

  parseObject(obj: unknown): Investigator {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Invalid investigator payload');
    }
    const hasStaticFromJSON = typeof (Investigator as any).fromJSON === 'function';
    return hasStaticFromJSON ? (Investigator as any).fromJSON(obj) : this.mapToInvestigator(obj as any);
  }

  private mapToInvestigator(json: any): Investigator {
    // Fallback path if static fromJSON is not present on Investigator
    // Delegate parsing to model-specific fromJSON methods
    const inv = Investigator.fromJSON(json);
    return inv;
  }

}
