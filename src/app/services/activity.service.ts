import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { InstructorService } from './instructor.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [];

  constructor(private instructorService: InstructorService) {
    this.activities = this.generateActivities();
  }
  // BodyPump 2 Instructor || Spinning 1?
  private generateActivities(): Activity[] {
    const instructors = this.instructorService.getInstructors();

    return [
      new Activity("BodyPump", "Physical", new Date('2024-12-01T10:00:00'), [instructors[0], instructors[1]]),
      new Activity("Spinning", "Physical", new Date('2024-12-01T12:00:00'), [instructors[2]]),
      new Activity("Music Theory", "Educational", new Date('2024-12-01T14:00:00'), [instructors[3], instructors[4]]),
    ];
  }

  public getActivities(): Activity[] {
    return this.activities;
  }
}
