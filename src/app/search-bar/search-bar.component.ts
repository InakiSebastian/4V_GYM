import { Component, EventEmitter, Output, output } from '@angular/core';
import { MonitorTabComponent } from '../monitor-tab/monitor-tab.component';
import { FormControl , ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  imports: [ ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() filtering = new EventEmitter<string>();
  filterInput = new FormControl('');

  filter(){
    this.filtering.emit(this.filterInput.value || '');
  }

}
