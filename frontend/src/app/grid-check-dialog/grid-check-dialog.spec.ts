import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCheckDialog } from './grid-check-dialog';

describe('GridCheckOverlay', () => {
  let component: GridCheckDialog;
  let fixture: ComponentFixture<GridCheckDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCheckDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCheckDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
