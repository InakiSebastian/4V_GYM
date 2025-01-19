import { Component } from '@angular/core';
import { MonitorDetailsComponent } from "../monitor-details/monitor-details.component";
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-carousel',
  imports: [MonitorDetailsComponent,AsyncPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  allInstructors$!: Observable<Instructor[]>;
  subscriptionUpdate: Subscription = new Subscription;

  constructor(private instructorService: InstructorService) {
   
   }

   ngOnInit(){
    this.allInstructors$ = this.instructorService.getAllInstructors();
//TODO: ACTUALIZAR CUANDO SE HAGA UN CAMBIO. AHORA LO HACE, PERO POR ALGUNA RAZON SI QUITAS EL ALERT NO FUNCIONA. ENTIENDO QUE SERA PORQUE NO LE DA TIEMPO A HACER ALGO.
    this.subscriptionUpdate = this.instructorService.changesOnInstructors.subscribe(()=>{
      alert('update');
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

  ngOnDestroy() {
    this.subscriptionUpdate.unsubscribe();
  }


}
