import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-datecarrousel',
  imports: [],
  templateUrl: './activity-datecarrousel.component.html',
  styleUrl: './activity-datecarrousel.component.scss'
})
export class ActivityDatecarrouselComponent {
  @Input() selectedDate: Date | null = null;
  @Output() daySelected = new EventEmitter<Date>();
  actualDate: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.actualDate = this.getCompleteDay(this.selectedDate);
    }
  }

    private getCompleteDay(date: Date | null): string {
      if (!date) {
        return '';
      }
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    goToPreviousDay(): void {
      if (this.selectedDate) {
        const previousDay = new Date(this.selectedDate);
        previousDay.setDate(this.selectedDate.getDate() - 1);
        console.log(this.selectedDate);
        this.daySelected.emit(previousDay);
      }
    }
  
    goToNextDay(): void {
      if (this.selectedDate) {
        const nextDay = new Date(this.selectedDate);
        nextDay.setDate(this.selectedDate.getDate() + 1);
        console.log(this.selectedDate);
        this.daySelected.emit(nextDay);
      }
    }
   
}
