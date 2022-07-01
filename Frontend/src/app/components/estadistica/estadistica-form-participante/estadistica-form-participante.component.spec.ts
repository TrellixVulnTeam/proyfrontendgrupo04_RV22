import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaFormParticipanteComponent } from './estadistica-form-participante.component';

describe('EstadisticaFormParticipanteComponent', () => {
  let component: EstadisticaFormParticipanteComponent;
  let fixture: ComponentFixture<EstadisticaFormParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaFormParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaFormParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
