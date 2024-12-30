import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabSelectorComponent } from "./tab-selector/tab-selector.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '4V_GYM';
}
