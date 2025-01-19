import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditInstructorComponent } from './form-edit-instructor.component';

describe('FormEditInstructorComponent', () => {
  let component: FormEditInstructorComponent;
  let fixture: ComponentFixture<FormEditInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
