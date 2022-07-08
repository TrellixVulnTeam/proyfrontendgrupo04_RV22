import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarraOficinaComponent } from './grafica-barra-oficina.component';

describe('GraficaBarraOficinaComponent', () => {
  let component: GraficaBarraOficinaComponent;
  let fixture: ComponentFixture<GraficaBarraOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaBarraOficinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBarraOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
