import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-calendar-days',
  imports: [CommonModule],
  templateUrl: './activity-calendar-days.component.html',
  styleUrl: './activity-calendar-days.component.scss'
})
export class ActivityCalendarDaysComponent {
  @Input() numberOfDay: number | null = null; // Recibe el número del día o null
  @Output() daySelected = new EventEmitter<number>(); // Evento emitido al hacer clic

  onDayClick(): void {
    if (this.numberOfDay) {
      this.daySelected.emit(this.numberOfDay); // Emitir el número del día al padre
    }
  }
}
