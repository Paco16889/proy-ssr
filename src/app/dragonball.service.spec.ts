import { TestBed } from '@angular/core/testing';

import { DragonballService } from './dragonball.service';

describe('DragonballService', () => {
  let service: DragonballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
