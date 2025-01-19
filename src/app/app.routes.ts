import { Routes } from '@angular/router';
import { ActivityMainComponent } from './activity-main/activity-main.component';
import { MonitorTabComponent } from './monitor-tab/monitor-tab.component';

export const routes: Routes = [
    {path:"activities",component:ActivityMainComponent},
    {path:"monitores",component:MonitorTabComponent}
];
