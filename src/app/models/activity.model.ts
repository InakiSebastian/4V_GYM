import { Instructor } from "./instructor.model";

export class Activity {
    activityName: string;
    activityType: string;
    activityDate: Date;
    instructorList: Instructor[];

    constructor(activityName: string, activityType: string,activityDate: Date, instructorList: Instructor[]) {
        this.activityName = activityName;
        this.activityType = activityType;
        this.activityDate = activityDate;
        this.instructorList = instructorList;
    }

    toString() {
        return `Activity: ${this.activityName} of type: ${this.activityType} with instructors: ${this.instructorList}`;
    }   
}
