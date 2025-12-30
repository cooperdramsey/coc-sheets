import { Routes } from '@angular/router';
import { InvestigatorSheet } from './investigator-sheet/investigator-sheet';
import { CharacterCreation } from './character-creation/character-creation';

export const routes: Routes = [
    {
        path: '',
        component: InvestigatorSheet
    },
    {
        path: 'create',
        component: CharacterCreation
    }
];
