import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialParticipanteComponent } from './historial-participante.component';

describe('HistorialParticipanteComponent', () => {
  let component: HistorialParticipanteComponent;
  let fixture: ComponentFixture<HistorialParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
