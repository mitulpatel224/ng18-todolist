import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusModeComponent } from './focus-mode.component';

describe('FocusModeComponent', () => {
  let component: FocusModeComponent;
  let fixture: ComponentFixture<FocusModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
