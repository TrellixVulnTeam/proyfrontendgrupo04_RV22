import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaReunionTiempoComponent } from './estadistica-reunion-tiempo.component';

describe('EstadisticaReunionTiempoComponent', () => {
  let component: EstadisticaReunionTiempoComponent;
  let fixture: ComponentFixture<EstadisticaReunionTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaReunionTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaReunionTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
