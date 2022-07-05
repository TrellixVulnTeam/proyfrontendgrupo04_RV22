import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRecursoComponent } from './alta-recurso.component';

describe('AltaRecursoComponent', () => {
  let component: AltaRecursoComponent;
  let fixture: ComponentFixture<AltaRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaRecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
