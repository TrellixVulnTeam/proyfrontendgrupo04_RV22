import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaFormOficinaComponent } from './estadistica-form-oficina.component';

describe('EstadisticaFormOficinaComponent', () => {
  let component: EstadisticaFormOficinaComponent;
  let fixture: ComponentFixture<EstadisticaFormOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaFormOficinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaFormOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
