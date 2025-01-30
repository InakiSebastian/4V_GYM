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
  @Output() addOrEditActivity: EventEmitter<{ action: string, activity: Activity | null }> = new EventEmitter();
  icon: string = "";
  constructor(private activityService: ActivityService){
  }

  ngOnInit(){
  this.instructorNames = this.getInstructorNames(this.activity);
  console.log(this.instructorNames);
  console.log(this.activity);
  if (!this.activity?.icon || this.activity?.icon.startsWith('icon')) {
    this.icon = this.getIconDefault();
  } else {
    this.icon = this.activity?.icon;
  }
  }

  onAddActivity(action: string): void {
    this.addOrEditActivity.emit({ action, activity: this.activity }); // Concreción del Output recibido por el Modal de material A.
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

  private getIconDefault():string{
    const icons = [
      "fa-solid fa-bicycle",
      "fa-solid fa-person-swimming",
      "fa-solid fa-person-skating",
      "fa-solid fa-weight-hanging",
      "fa-solid fa-table-tennis-paddle-ball"
    ];
    const randomIndex = Math.floor(Math.random() * icons.length); // Índice aleatorio
    return icons[randomIndex];
  }
  
}
