import { Component, signal, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvestigatorSheet } from './investigator-sheet/investigator-sheet';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('call-of-cthulhu-sheets');
  @ViewChild(RouterOutlet) outlet?: RouterOutlet;

  // TODO move this somewhere
  downloadSheetData() {
    const component = this.outlet?.component as InvestigatorSheet | undefined;
    const investigator = component?.investigator;

    // Fallback if investigator is not yet available
    const payload = investigator ?? { message: 'No investigator loaded' };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "investigator-sheet.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
