import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridbox } from './gridbox';

describe('Gridbox', () => {
  let component: Gridbox;
  let fixture: ComponentFixture<Gridbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gridbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gridbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
