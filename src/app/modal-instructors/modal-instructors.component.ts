import { Component, input } from '@angular/core';
import { FormEditInstructorComponent } from "../form-edit-instructor/form-edit-instructor.component";

@Component({
  selector: 'app-modal-instructors',
  imports: [FormEditInstructorComponent],
  templateUrl: './modal-instructors.component.html',
  styleUrl: './modal-instructors.component.scss'
})
export class ModalInstructorsComponent {
  name = input("");
  email = input("");
  telf = input("");
  id = input("default");
  modalId :string = ""
  ngOnInit(){
    this.modalId = "modalEdit" + this.id();

  }


}
