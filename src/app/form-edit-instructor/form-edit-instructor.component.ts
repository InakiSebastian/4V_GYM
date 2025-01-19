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

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telf: new FormControl('', [Validators.required]),
  });

  ngOnInit(){
    this.addForm.reset();
    this.addValues();
  }

 addValues(){
    this.addForm.get('name')?.setValue(this.nameOrigin());
    this.addForm.get('email')?.setValue(this.emailOrigin());
    this.addForm.get('telf')?.setValue(this.telfOrigin());
 }

  get email() {
    return this.addForm.get('email');
  }
  get name() {
    return this.addForm.get('name');
  }
  get telf() {
    return this.addForm.get('telf');
  }

  sendForm() {
    if (this.addForm.valid) {
      const instructorData = new Instructor(
        0,
        this.addForm.get('name')?.value || '',
        this.addForm.get('email')?.value || '',
        Number(this.addForm.get('telf')?.value) || 0
      );

      this.instructorService
        .setInstructors(instructorData)
        .subscribe((json) => {
          alert(JSON.stringify(json));
        });
      this.addForm.reset();
      this.instructorService.notifyUpdateContact(null);
    }
  }

  isNumber(value: any): boolean {
    return isNaN(value);
  }
}
