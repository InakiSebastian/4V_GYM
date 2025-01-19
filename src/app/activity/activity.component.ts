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
  @Input() hourStart: string = '10:30';
  @Input() hourEnd: string = '12:00';
  @Input() instructorsName: String[] = ['Miguel Goyena'];
  @Input() activityIcon: string = '';
  @Input() activity: Activity | null = null;
  @Output() addOrEditActivity: EventEmitter<{ action: string, activity: Activity | null }> = new EventEmitter();

  constructor(private activityService: ActivityService){}

  onAddActivity(action: string): void {
    this.addOrEditActivity.emit({ action, activity: this.activity }); // Concreción del Output
  }

  onDeleteActivity(): void {
    if (this.activity) {
      this.activityService.deleteActivity(this.activity);
      alert(`activity deleted`);
    }
  }
}
