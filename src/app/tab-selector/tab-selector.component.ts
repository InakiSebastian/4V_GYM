import { Component } from '@angular/core';
import { TabComponent } from "../tab/tab.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-selector',
  imports: [TabComponent, RouterLink],
  templateUrl: './tab-selector.component.html',
  styleUrl: './tab-selector.component.scss'
})
export class TabSelectorComponent {

}
