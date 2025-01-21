import { Component, input, InputSignal } from '@angular/core';
import { MonitorDetailsComponent } from "../monitor-details/monitor-details.component";
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [MonitorDetailsComponent,AsyncPipe,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  allInstructors$!: Observable<Instructor[]>;
  subscriptionUpdate: Subscription = new Subscription;
  filterValue = input('bob');
  error = false;

  constructor(private instructorService: InstructorService) {
   
   }

   ngOnInit(){
    this.allInstructors$ = this.instructorService.getAllInstructors();
    this.subscriptionUpdate = this.instructorService.changesOnInstructors.subscribe(()=>{
      alert("ACTUALIZANDO LISTA");
      this.allInstructors$ = this.instructorService.getAllInstructors();
    });
   }

  

  groupInstructors(fullListMonitor: Instructor[]): Instructor[][] {
    var result = [];
    for (let i = 0; i < fullListMonitor.length; i += 3) {
      result.push(fullListMonitor.slice(i, i + 3));
    }
    return result;
  
  }

  
  
  getError():boolean{
    return this.error;
  }
 
  filterByText(fullListMonitor:Instructor[]): Instructor[]{
    
    var filterList = fullListMonitor.filter((instructor) => instructor.name.toLowerCase().includes(this.filterValue().toLowerCase()));
    console.log(0);
    if (this.filterValue() == "") {
      this.error=false;
      return fullListMonitor;
    }

    if (filterList.length == 0) {
      this.error = true;
      return fullListMonitor;
    }
    this.error=false;
    return filterList;
  }

  ngOnDestroy() {
    this.subscriptionUpdate.unsubscribe();
  }


}
