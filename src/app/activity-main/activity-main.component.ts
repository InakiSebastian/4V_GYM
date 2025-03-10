import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import {AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityService } from '../services/activity.service';
import { ActivityCalendarComponent } from '../activity-calendar/activity-calendar.component';
import { ActivityDatecarrouselComponent } from '../activity-datecarrousel/activity-datecarrousel.component';
import { ActivityComponent } from '../activity/activity.component';
import { Activity } from '../models/activity.model';
import { ActivityModalDialogComponent } from '../activity-modal-dialog/activity-modal-dialog.component';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-activity-main',
  imports: [ActivityCalendarComponent, 
    ActivityDatecarrouselComponent, 
    ActivityComponent, 
    AsyncPipe, 
    CommonModule, 
    ActivityModalDialogComponent, 
    ReactiveFormsModule],
  templateUrl: './activity-main.component.html',
  styleUrl: './activity-main.component.scss'
})
export class ActivityMainComponent {
  @ViewChild(ActivityModalDialogComponent)
  private modalChild!: ActivityModalDialogComponent;

  activitiesListAsync$!: Observable<Activity[]>;
  selectedDate: Date | null = null;
  numberActivities: number = 3;
  hoursActivities: any = [["9:00", "10:30"], ["13:30", "15:00"], ["17:30", "19:00"]];

  constructor(private activityService: ActivityService) {}



  // Método que recibe la fecha desde el calendario
  onDateSelected(date: Date): void {
    this.selectedDate = date instanceof Date ? date : new Date(date);
    console.log('Fecha seleccionada:', this.selectedDate);
    this.activitiesListAsync$ = this.activityService.getActivitiesByDate(date).pipe(
      tap(activities => console.log("Actividades filtradas en MAIN:", activities))
    );
  }

  onAddOrEditActivity(event: { action: string, activity: Activity | null, hourStart: string, hourEnd: string}): void {
    this.openModal(event.action, event.activity, event.hourStart, event.hourEnd);
  }


  openModal(action: string, activity: Activity | null, hourStart: string, hourEnd: string): void {
    this.modalChild.action = action as ('create'|'edit');
    this.modalChild.activity = activity;
    this.modalChild.date = this.selectedDate || new Date();
    this.modalChild.hourStart = hourStart;
    this.modalChild.hourEnd = hourEnd;
    this.modalChild.initializeForm();
    this.modalChild.show();
  } 
 
}
