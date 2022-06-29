import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaFormTiempoComponent } from './estadistica-form-tiempo.component';

describe('EstadisticaFormTiempoComponent', () => {
  let component: EstadisticaFormTiempoComponent;
  let fixture: ComponentFixture<EstadisticaFormTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaFormTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaFormTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
