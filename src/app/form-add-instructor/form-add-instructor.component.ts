import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-add-instructor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-add-instructor.component.html',
  styleUrl: './form-add-instructor.component.scss'
})
export class FormAddInstructorComponent {

  addForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    telf: new FormControl('',[Validators.required]),
  });

  get email(){
    return this.addForm.get('email');
  }
  get name(){
    return this.addForm.get('name');
  }
  get telf(){
    return this.addForm.get('telf');
  }

  sendForm(){
    this.addForm.reset();
  }

  isNumber(value: any):boolean{
    return isNaN(value);
  }


}
