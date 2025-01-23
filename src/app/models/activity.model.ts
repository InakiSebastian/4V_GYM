import { Instructor } from "./instructor.model";

export class Activity {
    name: string;
    icon: string;
    date: Date;
    instructorList?: Instructor[];
    hourStart: string;
    hourEnd: string;

    constructor(activityName: string, activityType: string, date: number | Date, instructorList: Instructor[]) {
        this.name = activityName;
        this.icon = activityType;
        this.date = (date instanceof Date)? date : new Date(date * 1000);
        this.instructorList = instructorList;
        this.hourStart = this.formatTime(this.date.getHours(), this.date.getMinutes());
        this.hourEnd = this.calculateEndTime(this.date);
    }
    

    toString() {
        return `Activity: ${this.name} of type: ${this.icon} with instructors: ${this.instructorList}`;
    }
    
    private formatTime(hours: number, minutes: number): string {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    private calculateEndTime(date: Date): string {
        const newDate = new Date(date.getTime());
        newDate.setTime(newDate.getTime() + (1 * 60 * 60 * 1000) + (30 * 60 * 1000)); // Suma de 1,5 horas en milisegundos
        const endHours = newDate.getHours();
        const endMinutes = newDate.getMinutes();
        return this.formatTime(endHours, endMinutes);
    }
    
}
