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

  activityForm!: FormGroup;
  instructorList$!: Observable<Instructor[]>;
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
  }

  /**
   * El padre Activity-Main llama a este método.
   */
  public initializeForm(): void {
    if (this.activity && this.action === 'edit') {
      this.activityForm.patchValue({
        activityName: this.activity.name || '',
        monitor1: this.activity.instructorList?.[0]?.name || '',
        monitorN: this.activity.instructorList?.[1]?.name || ''
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
    const allInstructors = this.instructorService.getInstructors(); 
    const selectedInstructors = allInstructors.filter(instructor =>
      [formValues.monitor1, formValues.monitorN].includes(instructor.name)
    );
  
    const newActivity = new Activity(
      formValues.activityName,
      formValues.activityName,
      this.date || new Date(),
      selectedInstructors
    );
  
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
  


}
