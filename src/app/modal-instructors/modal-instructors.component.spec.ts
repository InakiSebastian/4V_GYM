import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstructorsComponent } from './modal-instructors.component';

describe('ModalInstructorsComponent', () => {
  let component: ModalInstructorsComponent;
  let fixture: ComponentFixture<ModalInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInstructorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
