import { TestBed } from '@angular/core/testing';

import { InternationalSynonymsService } from './international-synonyms.service';

describe('InternationalSynonymsService', () => {
  let service: InternationalSynonymsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalSynonymsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
