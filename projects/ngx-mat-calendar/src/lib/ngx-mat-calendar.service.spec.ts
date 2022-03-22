import { TestBed } from '@angular/core/testing';

import { NgxMatCalendarService } from './ngx-mat-calendar.service';

describe('NgxMatCalendarService', () => {
  let service: NgxMatCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
