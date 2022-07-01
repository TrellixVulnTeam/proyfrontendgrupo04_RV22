import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParticipantesComponent } from './form-participantes.component';

describe('FormParticipantesComponent', () => {
  let component: FormParticipantesComponent;
  let fixture: ComponentFixture<FormParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormParticipantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
