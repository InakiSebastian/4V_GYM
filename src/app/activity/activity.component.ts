import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../models/activity.model';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity',
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input() isFree: boolean = false;
  @Input() activity: Activity | null = null;
  instructorNames: string[] = [];
  @Input() activityStart: string = "9:00";
  @Input() activityEnd: string = "10:30"; 
  @Output() addOrEditActivity: EventEmitter<{ action: string, activity: Activity | null, hourStart: string, hourEnd: string }> = new EventEmitter();
  constructor(private activityService: ActivityService){
  }

  ngOnInit(){
  this.instructorNames = (this.activity && this.activity.instructors)? this.activity.instructors : ["No name"];
  console.log("Instructores: " +this.instructorNames);
  }

  onAddActivity(action: string): void {
    this.addOrEditActivity.emit({ action, activity: this.activity, hourStart: this.activityStart, hourEnd: this.activityEnd }); // Concreción del Output hacia Main-Activity.
  }

  onDeleteActivity(): void {
    if (this.activity) {
      this.activityService.deleteActivity(this.activity).subscribe(() => {
        alert('Actividad eliminada');
      });
    }
  }

 /*private getInstructorNames(activity: Activity | null): string[] {
    if (activity && Array.isArray(activity.instructors)) {
      return activity.instructors;
    }
    return [];
  }
*/
}
