import { TestBed } from '@angular/core/testing';

import { CalendargoogleService } from './calendargoogle.service';

describe('CalendargoogleService', () => {
  let service: CalendargoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendargoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
