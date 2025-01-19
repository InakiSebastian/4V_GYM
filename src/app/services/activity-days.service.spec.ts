import { TestBed } from '@angular/core/testing';

import { ActivityDaysService } from './activity-days.service';

describe('ActivityDaysService', () => {
  let service: ActivityDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
