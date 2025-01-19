import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabSelectorComponent } from "./tab-selector/tab-selector.component";
import { TabComponent } from "./tab/tab.component";
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { MonitorDetailsComponent } from "./monitor-details/monitor-details.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { MonitorTabComponent } from "./monitor-tab/monitor-tab.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabSelectorComponent, TabComponent, HeaderComponent, SearchBarComponent, MonitorDetailsComponent, CarouselComponent, MonitorTabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titleOrganization: string = '4V';
  titleBusiness: string = 'GYM';
}
