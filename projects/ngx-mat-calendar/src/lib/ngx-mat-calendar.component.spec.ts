import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCalendarComponent } from './ngx-mat-calendar.component';

describe('NgxMatCalendarComponent', () => {
  let component: NgxMatCalendarComponent;
  let fixture: ComponentFixture<NgxMatCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
