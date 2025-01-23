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
    */
  
  // Código hardcoded
  private activities: (Activity | null)[] = [];
  constructor() {
    this.activities = this.generateActivities();
  }

  private generateInstructors(): Instructor[] {
    return [
      new Instructor("Juanes Pérez", "juan@example.com", 123456789),
      new Instructor("Juana María López", "maria@example.com", 987654321),
      new Instructor("Juan Carlos Sánchez", "carlos@example.com", 111222333),
      new Instructor("Juana González", "ana@example.com", 444555666),
      new Instructor("Juan Fernández", "luis@example.com", 777888999),
    ];
  }

  private generateActivities(): (Activity | null)[] {
    const instructors = this.generateInstructors();

    return [
      new Activity("BodyPump", "fa-solid fa-bicycle fa-2xl text-danger", new Date(2025, 0, 20, 18, 0), [instructors[0], instructors[1]]),
      null,
      new Activity("Music Running", "fa-solid fa-2xl fa-volleyball text-danger", new Date(2025, 0, 20, 14, 0), [instructors[3]]),
    ];
  }
  
  // Borrar ARRIBA 

  getActivities(): (Activity | null)[]{
    return this.activities;
  }

  addActivity(activity: Activity): void {
    const nullIndex = this.activities.findIndex(act => act === null);
    
    if (nullIndex !== -1) {
      this.activities[nullIndex] = activity;
    } else {
      this.activities.push(activity);
    }
  }

  updateActivity(updatedActivity: Activity): void {
    const index = this.activities.findIndex(act => act && act.activityDate === updatedActivity.activityDate);
    if (index !== -1) {
      this.activities[index] = updatedActivity;
    }
  }

  deleteActivity(activity: Activity): void {
    const index = this.activities.findIndex(act => act && act.activityDate.getTime() === activity.activityDate.getTime());
    
    if (index !== -1) {
      this.activities[index] = null;
    }
  }

}
