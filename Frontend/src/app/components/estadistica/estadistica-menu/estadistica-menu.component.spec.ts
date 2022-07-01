import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaMenuComponent } from './estadistica-menu.component';

describe('EstadisticaMenuComponent', () => {
  let component: EstadisticaMenuComponent;
  let fixture: ComponentFixture<EstadisticaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
