import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDatecarrouselComponent } from './activity-datecarrousel.component';

describe('ActivityDatecarrouselComponent', () => {
  let component: ActivityDatecarrouselComponent;
  let fixture: ComponentFixture<ActivityDatecarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDatecarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDatecarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
