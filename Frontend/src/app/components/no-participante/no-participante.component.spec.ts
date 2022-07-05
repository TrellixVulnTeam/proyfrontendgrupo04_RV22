import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoParticipanteComponent } from './no-participante.component';

describe('NoParticipanteComponent', () => {
  let component: NoParticipanteComponent;
  let fixture: ComponentFixture<NoParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
