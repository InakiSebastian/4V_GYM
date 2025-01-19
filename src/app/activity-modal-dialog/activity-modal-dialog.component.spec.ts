import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModalDialogComponent } from './activity-modal-dialog.component';

describe('ActivityModalDialogComponent', () => {
  let component: ActivityModalDialogComponent;
  let fixture: ComponentFixture<ActivityModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityModalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
