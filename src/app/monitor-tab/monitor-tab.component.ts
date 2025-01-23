import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { FormAddInstructorComponent } from "../form-add-instructor/form-add-instructor.component";
import { ModalAddComponent } from "../modal-add/modal-add.component";
import { MonitorDetailsComponent } from "../monitor-details/monitor-details.component";

@Component({
  selector: 'app-monitor-tab',
  imports: [SearchBarComponent, CarouselComponent, FormAddInstructorComponent, ModalAddComponent, MonitorDetailsComponent],
  templateUrl: './monitor-tab.component.html',
  styleUrl: './monitor-tab.component.scss'
})
export class MonitorTabComponent {
  filterValue:string = "";

  constructor() { }

  filter(filterText: string) {   
    this.filterValue = filterText;
  }
}
