import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaReunionComponent } from './alta-reunion.component';

describe('AltaReunionComponent', () => {
  let component: AltaReunionComponent;
  let fixture: ComponentFixture<AltaReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
