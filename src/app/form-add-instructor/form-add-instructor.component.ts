import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup, Validators} from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';

@Component({
  selector: 'app-form-add-instructor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-add-instructor.component.html',
  styleUrl: './form-add-instructor.component.scss'
})
export class FormAddInstructorComponent {

  constructor(private instructorService: InstructorService) { }
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
    if(this.addForm.valid){

      const instructorData = new Instructor(0,this.addForm.get('name')?.value || '',this.addForm.get('email')?.value || '',Number(this.addForm.get('telf')?.value)|| 0);

      this.instructorService.setInstructors(instructorData).subscribe(json =>{

        alert("Monitor añadido");
        
      });
      this.addForm.reset();
      this.instructorService.notifyUpdateContact(null);

    }
  }

  isNumber(value: any): boolean {
    var resultado = !isNaN(parseFloat(value)) && isFinite(value);
    return resultado;
  }


}
