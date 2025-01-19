import { Instructor } from "./instructor.model";

export class Activity {
    activityName: string;
    activityType: string;
    activityDate: Date;
    instructorList: Instructor[];
    hourStart: string;
    hourEnd: string;

    constructor(activityName: string, activityType: string,activityDate: Date, instructorList: Instructor[]) {
        this.activityName = activityName;
        this.activityType = activityType;
        this.activityDate = activityDate;
        this.instructorList = instructorList;
        this.hourStart = this.formatTime(activityDate.getHours(), activityDate.getMinutes());
        this.hourEnd = this.calculateEndTime(activityDate);
    }

    toString() {
        return `Activity: ${this.activityName} of type: ${this.activityType} with instructors: ${this.instructorList}`;
    }
    
    private formatTime(hours: number, minutes: number): string {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    private calculateEndTime(date: Date): string {
        let endHours = date.getHours() + 1;
        let endMinutes = date.getMinutes() + 30;

        if (endMinutes >= 60) {
            endMinutes -= 60;
            endHours += 1;
        }

        return this.formatTime(endHours, endMinutes);
    }
}
