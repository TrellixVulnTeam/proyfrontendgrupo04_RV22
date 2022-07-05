import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionPdfComponent } from './reunion-pdf.component';

describe('ReunionPdfComponent', () => {
  let component: ReunionPdfComponent;
  let fixture: ComponentFixture<ReunionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
