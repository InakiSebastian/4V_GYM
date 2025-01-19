import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityDaysService {
  constructor() { }
  

  getDaysForMonth(year: number, month: number): number[][] {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstWeekday = firstDayOfMonth.getDay();
    const lastWeekday = lastDayOfMonth.getDay();

    const startDate = new Date(year, month, 1 - firstWeekday);
    const endDate = new Date(year, month + 1, 6 - lastWeekday);

    // Matriz que almacena una lista de números, cada lista corresponde a una semana.
    const days: number[][] = [];
    let currentDate = new Date(startDate);

    // Mientras no superemos la fecha de final de mes.
    while (currentDate <= endDate) {
      const week: number[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDate.getDate());
        currentDate.setDate(currentDate.getDate() + 1);
      }
      days.push(week);
    }

    return days;
  }
}
