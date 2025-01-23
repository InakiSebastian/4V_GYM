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
      new Activity(activity.name, activity.icon, activity.date, activity.instructorList || [])
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
    return this.activities$.pipe(
      map(activities => {
        const index = activities.findIndex(activity =>
          new Date(activity.date).getTime() === new Date(updatedActivity.date).getTime()
        );

        if (index === -1) {
          throw new Error('Actividad no encontrada.');
        }

        const updatedActivities = [...activities];
        updatedActivities[index] = updatedActivity;

        this.activitiesSubject.next(updatedActivities);
        return updatedActivity;
      }),
      catchError(error => {
        console.error('Error al actualizar actividad:', error);
        throw new Error('No se pudo actualizar la actividad.');
      })
    );
  }


  deleteActivity(activityToDelete: Activity): Observable<void> {
    return this.activities$.pipe(
      map(activities => {
        // Filtrar para excluir la actividad a eliminar
        const updatedActivities = activities.filter(activity =>
          new Date(activity.date).getTime() !== new Date(activityToDelete.date).getTime()
        );
  
        // Actualizar la lista de actividades
        this.activitiesSubject.next(updatedActivities);
      }),
      catchError(error => {
        console.error('Error al eliminar actividad:', error);
        throw new Error('No se pudo eliminar la actividad.');
      })
    );
  }


  selectActivity(date: Date): Observable<Activity | undefined> {
    return this.activities$.pipe(
      map(activities =>
        activities.find(activity =>
          new Date(activity.date).getTime() === date.getTime()
        )
      )
    );
  }

  private isEqualDay(activity: Activity, date: Date): boolean{
    let dateActivity: Date = activity.date;
    return dateActivity.getFullYear() === date.getFullYear() 
    && dateActivity.getMonth() === date.getMonth() 
    && dateActivity.getDate() === date.getDate();
  }
}