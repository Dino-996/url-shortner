import { TestBed } from '@angular/core/testing';

import { ShortnerApiRest } from './shortner-api-rest';

describe('ShortnerApiRest', () => {
  let service: ShortnerApiRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortnerApiRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
