import { Component } from '@angular/core';
import { FormAddInstructorComponent } from "../form-add-instructor/form-add-instructor.component";

@Component({
  selector: 'app-modal-add',
  imports: [FormAddInstructorComponent],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.scss'
})
export class ModalAddComponent {

}
