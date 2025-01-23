import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor.model';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-activity-modal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './activity-modal-dialog.component.html',
  styleUrl: './activity-modal-dialog.component.scss',
})
export class ActivityModalDialogComponent implements OnInit {
  activityForm: FormGroup;
  instructorList!: Observable<Instructor[]>;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private instructorService: InstructorService,
    public _matDialogRef: MatDialogRef<ActivityModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { activity: Activity | null; action: 'edit' | 'create'; date: Date }
  ) {
    this.activityForm = this.fb.group({
      activityName: [data.activity?.name || '', Validators.required],
      activityIcon: [data.activity?.icon || '', Validators.required],
      instructor: [(data.activity?.instructorList?.length ? data.activity.instructorList[0].name : ''), Validators.required],
      activityDate: [data.date || new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.instructorList = this.instructorService.getAllInstructors();
  }

  saveActivity(): void {
    if (this.activityForm.invalid) return;

    const formValues = this.activityForm.value;
    const selectedInstructor = this.instructorService.getInstructors().find(i => i.name === formValues.instructor);

    if (!selectedInstructor) return;

    const newActivity = new Activity(
      formValues.activityName,
      formValues.activityIcon,
      formValues.activityDate,
      [selectedInstructor]
    );

    if (this.data.action === 'create') {
      this.activityService.addActivity(newActivity);
    } else if (this.data.action === 'edit' && this.data.activity) {
      this.activityService.updateActivity(newActivity);
    }

    this._matDialogRef.close();
  }
}
