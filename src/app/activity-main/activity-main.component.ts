import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import {AsyncPipe } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { ActivityCalendarComponent } from '../activity-calendar/activity-calendar.component';
import { ActivityDatecarrouselComponent } from '../activity-datecarrousel/activity-datecarrousel.component';
import { ActivityComponent } from '../activity/activity.component';
import { Activity } from '../models/activity.model';
import { ActivityModalDialogComponent } from '../activity-modal-dialog/activity-modal-dialog.component';

@Component({
  selector: 'app-activity-main',
  imports: [ActivityCalendarComponent, ActivityDatecarrouselComponent, ActivityComponent, AsyncPipe, CommonModule],
  templateUrl: './activity-main.component.html',
  styleUrl: './activity-main.component.scss'
})
export class ActivityMainComponent {
  
  activitiesListAsync$!: Observable<Activity[]>;
  selectedDate: Date | null = null;
  numberActivities: number = 3;
  hoursActivities: any = [["9:00", "10:30"], ["13:30", "15:00"], ["17:30", "19:00"]];

  constructor(private activityService: ActivityService, private _matDialog: MatDialog) {}

  ngOnInit() {}

  // Método que recibe la fecha desde el calendario
  onDateSelected(date: Date): void {
    this.selectedDate = date instanceof Date ? date : new Date(date);
    console.log('Fecha seleccionada:', this.selectedDate);
    this.activitiesListAsync$ = this.activityService.getActivitiesByDate(date);
    this.activitiesListAsync$.subscribe(activities => {
      console.log("Actividades filtradas en MAIN:", activities);
  });
  }

   onAddOrEditActivity(event: { action: string, activity: Activity | null }): void {
    this.openModal(event.action, event.activity);
  }

  // Método que abre el modal pasando la acción (crear o editar) y la actividad (si existe)
  openModal(action: string, activity: Activity | null): void {
    const dialogRef = this._matDialog.open(ActivityModalDialogComponent, {
      data: { action, activity }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
    });
  }  
 
}
