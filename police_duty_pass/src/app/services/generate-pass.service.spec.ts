import { TestBed } from '@angular/core/testing';

import { GeneratePassService } from './generate-pass.service';

describe('GeneratePassService', () => {
  let service: GeneratePassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratePassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
