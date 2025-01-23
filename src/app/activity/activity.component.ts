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
  @Output() addOrEditActivity: EventEmitter<{ action: string, activity: Activity | null }> = new EventEmitter();

  constructor(private activityService: ActivityService){}

  ngOnInit(){
  this.instructorNames = this.getInstructorNames(this.activity);
  console.log(this.instructorNames);
  }

  onAddActivity(action: string): void {
    this.addOrEditActivity.emit({ action, activity: this.activity }); // Concreción del Output
  }

  onDeleteActivity(): void {
    if (this.activity) {
      this.activityService.deleteActivity(this.activity).subscribe(() => {
        alert('Actividad eliminada');
      });
    }
  }

 private getInstructorNames(activity: Activity | null): string[] {
    if (activity && Array.isArray(activity.instructorList)) {
      return activity.instructorList.map(instructor => instructor.name);
    }
    return [];
  }
  
}
