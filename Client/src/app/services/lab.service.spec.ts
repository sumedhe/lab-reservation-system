import { TestBed, inject } from '@angular/core/testing';

import { LabService } from './lab.service';

describe('LabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabService]
    });
  });

  it('should be created', inject([LabService], (service: LabService) => {
    expect(service).toBeTruthy();
  }));
});
