import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorTabComponent } from './monitor-tab.component';

describe('MonitorTabComponent', () => {
  let component: MonitorTabComponent;
  let fixture: ComponentFixture<MonitorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
