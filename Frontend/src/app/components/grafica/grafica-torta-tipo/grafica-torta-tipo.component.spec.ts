import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTortaTipoComponent } from './grafica-torta-tipo.component';

describe('GraficaTortaTipoComponent', () => {
  let component: GraficaTortaTipoComponent;
  let fixture: ComponentFixture<GraficaTortaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaTortaTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaTortaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
