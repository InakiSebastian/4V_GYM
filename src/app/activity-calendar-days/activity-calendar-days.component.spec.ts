import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCalendarDaysComponent } from './activity-calendar-days.component';

describe('ActivityCalendarDaysComponent', () => {
  let component: ActivityCalendarDaysComponent;
  let fixture: ComponentFixture<ActivityCalendarDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCalendarDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCalendarDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
