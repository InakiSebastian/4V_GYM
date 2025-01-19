import { Component, Output, EventEmitter } from '@angular/core';
import { ActivityDaysService } from '../services/activity-days.service';
import { ActivityCalendarDaysComponent } from '../activity-calendar-days/activity-calendar-days.component';
import { CommonModule } from '@angular/common';
import { ICalendarDay } from '../models/ICalendarDay';


@Component({
  selector: 'app-activity-calendar',
  standalone: true,
  imports: [
    ActivityCalendarDaysComponent,
    CommonModule
  ],
  templateUrl: './activity-calendar.component.html',
  styleUrls: ['./activity-calendar.component.scss']
})
export class ActivityCalendarComponent {

  // Propiedades de la clase
  currentDate: Date = new Date();
  private _visibleMonth: number = this.currentDate.getMonth();
  private _visibleYear: number = this.currentDate.getFullYear();
  @Output() dateSelected = new EventEmitter<Date>();
  dayNames: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  weeks: ICalendarDay[][] = [];

  constructor(private daysService: ActivityDaysService) { }

  ngOnInit(): void {
    this.loadMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  goToNextMonth() {
    this._visibleMonth = (this._visibleMonth + 1) % 12;
    if (this._visibleMonth === 0) {
      this._visibleYear++; 
    }
    this.currentDate = new Date(this._visibleYear, this._visibleMonth, 1);
    this.loadMonth(this._visibleYear, this._visibleMonth);
  }

  goToPreviousMonth() {
    this._visibleMonth = (this._visibleMonth - 1 + 12) % 12;
  if (this._visibleMonth === 11) {
    this._visibleYear--;
  }
  this.currentDate = new Date(this._visibleYear, this._visibleMonth, 1);
  this.loadMonth(this._visibleYear, this._visibleMonth);
  }

  loadMonth(year: number, month: number): void {
    this._visibleYear = year;
    this._visibleMonth = month;

    const days = this.daysService.getDaysForMonth(year, month);
    this.weeks = days.map(week =>
      week.map(day => ({
        day,
        month: day <= 7 && week.indexOf(day) > 3 ? (month + 1) % 12 : 
               day > 20 && week.indexOf(day) < 2 ? (month - 1 + 12) % 12 :
               month
      }))
    );
  }

  selectDate(day: number): void {
    this.currentDate = new Date(this._visibleYear, this._visibleMonth, day);
  }

  onCancel(): void {
    this.currentDate = new Date();
    this.selectDate(this.currentDate.getDay());
    this.loadMonth(this.currentDate.getFullYear(), this.currentDate.getMonth()+1);
  }

  onApply() {
    this.dateSelected.emit(this.currentDate);
    console.log(this.currentDate);
  }

  isSelected(day: number, month: number): boolean {
    return (
      this.currentDate.getDate() === day && 
      this.currentDate.getMonth() === month &&
      this.currentDate.getFullYear() === this._visibleYear
    );
  }
  
}

