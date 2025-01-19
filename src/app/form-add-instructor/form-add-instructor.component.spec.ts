import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddInstructorComponent } from './form-add-instructor.component';

describe('FormAddInstructorComponent', () => {
  let component: FormAddInstructorComponent;
  let fixture: ComponentFixture<FormAddInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
