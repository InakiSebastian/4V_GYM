import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';



@Component({
  selector: 'app-form-edit-instructor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-edit-instructor.component.html',
  styleUrl: './form-edit-instructor.component.scss',
})
export class FormEditInstructorComponent {
  constructor(private instructorService: InstructorService) {

  }

  nameOrigin = input("");
  emailOrigin = input("");
  telfOrigin = input("");
  idOrigin= input("");

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telf: new FormControl('', [Validators.required]),
  });

  ngOnInit(){
    this.editForm.reset();
    this.addValues();
  }

 addValues(){
    this.editForm.get('name')?.setValue(this.nameOrigin());
    this.editForm.get('email')?.setValue(this.emailOrigin());
    this.editForm.get('telf')?.setValue(this.telfOrigin());
 }

  get email() {
    return this.editForm.get('email');
  }
  get name() {
    return this.editForm.get('name');
  }
  get telf() {
    return this.editForm.get('telf');
  }

  sendFormUpdate() {
    if (this.editForm.valid) {
      const instructorData = new Instructor(
        Number(this.idOrigin()),
        this.editForm.get('name')?.value || '',
        this.editForm.get('email')?.value || '',
        Number(this.editForm.get('telf')?.value) || 0
      );

      this.instructorService.updateInstructors(instructorData).subscribe((json) => {
        alert(instructorData.id + " " + instructorData.toString());
      });
      
      this.editForm.reset();
      
      this.instructorService.notifyUpdateContact(null);
    }
  }

  isNumber(value: any): boolean {
    return isNaN(value);
  }
}
