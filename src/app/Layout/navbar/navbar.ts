import { Component, NgZone } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InvestigatorStateService } from '../../Services/investigator-state.service';
import { InvestigatorLoaderService } from '../../Services/investigator-loader.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private state: InvestigatorStateService, private loader: InvestigatorLoaderService, private ngZone: NgZone) {}

  downloadSheetData() {
    const investigator = this.state.current;
    const payload = investigator ? investigator.toJSON() : { message: 'No investigator loaded' };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const suggestedName = investigator?.name ? `${investigator.name.replace(/\s+/g, '_').toLowerCase()}_sheet.json` : 'investigator-sheet.json';
    a.download = suggestedName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  uploadSheetData(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const inv = await this.loader.parseFile(file);
        // Ensure change detection runs by updating state inside Angular's zone
        this.ngZone.run(() => this.state.setCurrent(inv));
      } catch (err) {
        console.error('Failed to load investigator JSON', err);
        alert('Unable to load investigator JSON. Please verify the file.');
      }
    });
    input.click();
  }
}
