import { Component, input } from '@angular/core';
import { ModalInstructorsComponent } from "../modal-instructors/modal-instructors.component";

@Component({
  selector: 'app-monitor-details',
  imports: [ ModalInstructorsComponent],
  templateUrl: './monitor-details.component.html',
  styleUrl: './monitor-details.component.scss'
})
export class MonitorDetailsComponent {
  monitorName = input('monitorName');
  monitorEmail = input('monitorEmail');
  monitorPhone = input('monitorPhone'); 
  monitorId = input('default');
  modalId :string = ""
  ngOnInit(){
  this.modalId = '#modalEdit' + this.monitorId();
  }


  
}
