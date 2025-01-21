import { Component, input } from '@angular/core';
import { ModalInstructorsComponent } from "../modal-instructors/modal-instructors.component";
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-monitor-details',
  imports: [ ModalInstructorsComponent],
  templateUrl: './monitor-details.component.html',
  styleUrl: './monitor-details.component.scss'
})
export class MonitorDetailsComponent {

  constructor(private instructorService: InstructorService) { }

  monitorName = input('monitorName');
  monitorEmail = input('monitorEmail');
  monitorPhone = input('monitorPhone'); 
  monitorId = input('default');
  modalId :string = ""
  ngOnInit(){
  this.modalId = '#modalEdit' + this.monitorId();
  }

  deleteInstructor(){
    this.instructorService.deleteInstructors(Number(this.monitorId())).subscribe((data)=>{
      alert("Monitor eliminado");
      this.instructorService.notifyUpdateContact(data);

    })
  }


  
}
