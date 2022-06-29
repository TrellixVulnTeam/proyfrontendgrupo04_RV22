import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaReunionOficinaComponent } from './estadistica-reunion-oficina.component';

describe('EstadisticaReunionOficinaComponent', () => {
  let component: EstadisticaReunionOficinaComponent;
  let fixture: ComponentFixture<EstadisticaReunionOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaReunionOficinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaReunionOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
