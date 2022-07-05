import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaParticipanteComponent } from './agenda-participante.component';

describe('AgendaParticipanteComponent', () => {
  let component: AgendaParticipanteComponent;
  let fixture: ComponentFixture<AgendaParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
