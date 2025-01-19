import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import {AsyncPipe } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { ActivityCalendarComponent } from '../activity-calendar/activity-calendar.component';
import { ActivityDatecarrouselComponent } from '../activity-datecarrousel/activity-datecarrousel.component';
import { ActivityComponent } from '../activity/activity.component';
import { Activity } from '../models/activity.model';
import { Instructor } from '../models/instructor.model';
import { ActivityModalDialogComponent } from '../activity-modal-dialog/activity-modal-dialog.component';
import { ActivityDaysService } from '../services/activity-days.service';

@Component({
  selector: 'app-activity-main',
  imports: [ActivityCalendarComponent, ActivityDatecarrouselComponent, ActivityComponent, AsyncPipe],
  templateUrl: './activity-main.component.html',
  styleUrl: './activity-main.component.scss'
})
export class ActivityMainComponent {
   // Hardcodeo de datos SI BORRAR DESPUéS //
  selectedDate: Date | null = null;
  activitiesListAsync$!: (Activity | null)[];

  constructor(private activityService: ActivityService, private _matDialog: MatDialog) {
    this.activitiesListAsync$ = this.activityService.getActivities();
  }

  ngOnInit() {}

  // Método que recibe la fecha desde el calendario o el carrousel
  onDateSelected(date: Date): void {
    this.selectedDate = date;
    console.log('Date selected:', this.selectedDate);
  }

  getInstructorNames(activity: Activity | null): String[] {
    return activity?.instructorList?.map(instructor => instructor.name) || [];
  }

  onAddOrEditActivity(event: { action: string, activity: Activity | null }): void {
    this.openModal(event.action, event.activity);
  }

  // Método que abre el modal pasando la acción (crear o editar) y la actividad
  openModal(action: string, activity: Activity | null): void {
    const dialogRef = this._matDialog.open(ActivityModalDialogComponent, {
      data: { action, activity, date: this.selectedDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Close');
    });
  }

 
 



  /*
  // NO BORRAR!!!
  activitiesListAsync$!: Observable<Activity[]>;
  selectedDate: Date | null = null;

  constructor(private activityService: ActivityService, private _matDialog: MatDialog) {}

  ngOnInit() {}

  // Método que recibe la fecha desde el calendario
  onDateSelected(date: Date): void {
    this.selectedDate = date; // Almacena la fecha seleccionada
    console.log('Fecha seleccionada:', this.selectedDate);
    
    // Notifica al servicio la nueva fecha
    this.activityService.updateSelectedDate(date);

    // Actualiza la lista de actividades basadas en la nueva fecha
    this.activitiesListAsync$ = this.activityService.getActivitiesByDate(date);
    


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
      console.log('El modal fue cerrado');
      // Puedes manejar el resultado aquí si es necesario
    });
  }

  getInstructorNames(activity: Activity | null): String[] {
    return activity?.instructorList?.map(instructor => instructor.name) || [];
  }
  */
}
