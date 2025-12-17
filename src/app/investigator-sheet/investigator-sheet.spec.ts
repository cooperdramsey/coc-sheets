import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatorSheet } from './investigator-sheet';

describe('InvestigatorSheet', () => {
  let component: InvestigatorSheet;
  let fixture: ComponentFixture<InvestigatorSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigatorSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigatorSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
