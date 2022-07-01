import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaReunionParticipanteComponent } from './estadistica-reunion-participante.component';

describe('EstadisticaReunionParticipanteComponent', () => {
  let component: EstadisticaReunionParticipanteComponent;
  let fixture: ComponentFixture<EstadisticaReunionParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaReunionParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaReunionParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
