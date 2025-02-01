import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Instructor } from '../models/instructor.model';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { InstructorService } from '../services/instructor.service';

import * as bootstrap from 'bootstrap'; 

@Component({
  selector: 'app-activity-modal-dialog',
  templateUrl: './activity-modal-dialog.component.html',
  styleUrls: ['./activity-modal-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ActivityModalDialogComponent implements OnInit {
  @ViewChild('modalElement') modalElement!: ElementRef<HTMLDivElement>;

  // Estos @Input() se setearán desde el padre: (ActivityMainComponent)
  @Input() action: 'create' | 'edit' = 'create';
  @Input() activity: Activity | null = null;
  @Input() date: Date | null = null;
  @Input() hourStart: string = "09:30"; //Default. Gets overwritten.
  @Input() hourEnd: string = "11:00" ;

  activityForm!: FormGroup;
  instructorList$!: Observable<Instructor[]>;
  instructorNames : string[] = [];
  activityNames: string[] = ['Yoga', 'Spinning', 'Natación', 'Pilates'];
  private bootstrapModal?: bootstrap.Modal;


  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      activityName: ['', Validators.required],
      monitor1: [''],
      monitorN: ['']
    });

    this.instructorList$ = this.instructorService.getAllInstructors();
    this.instructorList$.subscribe(instructors=> {
      this.instructorNames = instructors.map(instructor => instructor.name)
    });
  }

  /**
   * El padre Activity-Main llama a este método.
   */
  public initializeForm(): void {
    if (this.activity && this.action === 'edit') {
      this.activityForm.patchValue({
        activityName: this.activity.name || '',
        monitor1: this.activity.instructors?.[0] || '',
        monitorN: this.activity.instructors?.[1] || ''
      });
    } else {
      this.activityForm.reset({
        activityName: '',
        monitor1: '',
        monitorN: ''
      });
    }
  }


  public show(): void {
    if (!this.bootstrapModal) {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement, {
        backdrop: 'static', 
        keyboard: false   
      });
    }
    this.bootstrapModal.show();
  }

 
  public closeModal(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }


  public saveActivity(): void {
    if (this.activityForm.invalid) {
      return;
    }
  
    const formValues = this.activityForm.value;
    const selectedInstructors = this.instructorNames.filter(name =>
      [formValues.monitor1, formValues.monitorN].includes(name)
    );
  
    const newActivity = new Activity(
      formValues.activityName,
      "",
      this.buildStartEndDates(this.hourStart),
      this.buildStartEndDates(this.hourEnd),
      selectedInstructors);
  
    if (this.action === 'create') {
      this.activityService.addActivity(newActivity).subscribe({
        next: (createdActivity) => {
          console.log('Actividad creada:', createdActivity);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear la actividad:', error);
        }
      });
    } else if (this.action === 'edit' && this.activity) {
      this.activityService.updateActivity(newActivity).subscribe({
        next: (updatedActivity) => {
          console.log('Actividad actualizada:', updatedActivity);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar la actividad:', error);
        }
      });
    }
  }
  
  private buildStartEndDates(hourToSet: string): Date {
    if (!this.date) {
        throw new Error("La fecha base no está definida.");
    }

    let datePerHour = new Date(this.date);
    const timeParts = hourToSet.split(":").map(Number); // ["09", "00"] -> [9, 0]
    if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
        throw new Error("Formato de hora incorrecto. Debe ser HH:mm");
    }

    datePerHour.setHours(timeParts[0], timeParts[1], 0, 0);
    return datePerHour;
}



}
