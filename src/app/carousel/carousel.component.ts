import { Component } from '@angular/core';
import { MonitorDetailsComponent } from "../monitor-details/monitor-details.component";
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [MonitorDetailsComponent,AsyncPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  allInstructors$!: Observable<Instructor[]>;
  // groupedListMonitor : Instructor[][];
  constructor(private instructorService: InstructorService) {
    // this.groupedListMonitor = this.groupInstructors(this.instructorService.getInstructors());
    this.allInstructors$ = this.instructorService.getAllInstructors();
   }

  groupInstructors(fullListMonitor: Instructor[]): Instructor[][] {
    var result = [];
    for (let i = 0; i < fullListMonitor.length; i += 3) {
      result.push(fullListMonitor.slice(i, i + 3));
    }
    return result;
  }


}
