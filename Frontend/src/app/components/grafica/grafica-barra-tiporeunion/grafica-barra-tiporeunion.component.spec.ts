import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarraTiporeunionComponent } from './grafica-barra-tiporeunion.component';

describe('GraficaBarraTiporeunionComponent', () => {
  let component: GraficaBarraTiporeunionComponent;
  let fixture: ComponentFixture<GraficaBarraTiporeunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaBarraTiporeunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBarraTiporeunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
