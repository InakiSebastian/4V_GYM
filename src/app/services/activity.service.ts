import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'https://678d41e7f067bf9e24e9ccd1.mockapi.io/4vgym/activities';
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  activities$ = this.activitiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadActivities();
  }

  getAllActivities(): Observable<Activity[]> {
    return this.activities$;
  }

  getActivitiesByDate(date: Date): Observable<Activity[]> {
    return this.activities$.pipe(
      map(activities => 
        activities.filter(activity => 
          this.isEqualDay(activity, date)
        )
      )
    );
}

private loadActivities(): void {
  this.http.get<Activity[]>(this.apiUrl).pipe(
    catchError(error => {
      console.error('Error al cargar actividades:', error);
      throw new Error('No se pudo cargar las actividades.');
    })
  ).subscribe(apiActivities => {
    const activities = apiActivities.map(activity => 
      new Activity(
        activity.name,
        activity.icon,
        new Date(activity.dateStart),new Date(activity.dateEnd),
        activity.instructors || [],
        activity.id
      )
    );
    
    this.activitiesSubject.next(activities);
  });
}

  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity).pipe(
      tap(newActivity => {
        const currentActivities = this.activitiesSubject.getValue();
        this.activitiesSubject.next([...currentActivities, newActivity]);
      }),
      catchError(error => {
        console.error('Error al agregar actividad:', error);
        throw new Error('No se pudo agregar la actividad.');
      })
    );
  }

  updateActivity(updatedActivity: Activity): Observable<Activity> {
    if (!updatedActivity.id) {
      throw new Error('La actividad no tiene ID asignado.');
    }

    const url = `${this.apiUrl}/${updatedActivity.id}`;
    return this.http.put<Activity>(url, updatedActivity).pipe(
      tap(() => {
        const currentActivities = this.activitiesSubject.getValue();
        const updatedActivities = currentActivities.map(activity =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        );
        this.activitiesSubject.next(updatedActivities);
      }),
      catchError(error => {
        console.error('Error al actualizar actividad:', error);
        throw new Error('No se pudo actualizar la actividad.');
      })
    );
  }

  deleteActivity(activityToDelete: Activity): Observable<void> {
    if (!activityToDelete.id) {
      throw new Error('La actividad no tiene ID asignado.');
    }

    const url = `${this.apiUrl}/${activityToDelete.id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const currentActivities = this.activitiesSubject.getValue();
        const updatedActivities = currentActivities.filter(activity => activity.id !== activityToDelete.id);
        this.activitiesSubject.next(updatedActivities);
      }),
      catchError(error => {
        console.error('Error al eliminar actividad:', error);
        throw new Error('No se pudo eliminar la actividad.');
      })
    );
  }

  selectActivity(id: number): Observable<Activity | undefined> {
    return this.activities$.pipe(
      map(activities =>
        activities.find(activity => activity.id === id)
      )
    );
  }

  private isEqualDay(activity: Activity, date: Date): boolean {
    const dateSelectedStart = new Date(date);
    dateSelectedStart.setHours(0, 0, 0, 0);
    const dateSelectedEnd = new Date(date);
    dateSelectedEnd.setHours(23, 59, 59, 999);
    
    const dateActivityStart = new Date(activity.dateStart);
    const dateActivityEnd = new Date(activity.dateEnd);
    return dateActivityStart >= dateSelectedStart && dateActivityEnd <= dateSelectedEnd;
  }

  
}