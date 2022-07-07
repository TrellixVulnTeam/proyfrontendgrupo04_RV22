import { TestBed } from '@angular/core/testing';

import { AuthPGuard } from './auth-p.guard';

describe('AuthPGuard', () => {
  let guard: AuthPGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
