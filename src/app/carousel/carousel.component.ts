import { Component } from '@angular/core';
import { MonitorDetailsComponent } from "../monitor-details/monitor-details.component";
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';

@Component({
  selector: 'app-carousel',
  imports: [MonitorDetailsComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  groupedListMonitor : Instructor[][];
  constructor(private instructorService: InstructorService) {
    this.groupedListMonitor = this.groupInstructors(this.instructorService.getInstructors());
   }

  groupInstructors(fullListMonitor: Instructor[]): Instructor[][] {
    var result = [];
    for (let i = 0; i < fullListMonitor.length; i += 3) {
      result.push(fullListMonitor.slice(i, i + 3));
    }
    return result;
  }


}
