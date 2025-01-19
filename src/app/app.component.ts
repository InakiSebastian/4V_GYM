import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabSelectorComponent } from "./tab-selector/tab-selector.component";
import { TabComponent } from "./tab/tab.component";
import { HeaderComponent } from './header/header.component';
import { ActivityMainComponent } from './activity-main/activity-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabSelectorComponent, TabComponent, HeaderComponent, ActivityMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titleOrganization: string = '4V';
  titleBusiness: string = 'GYM';
}
