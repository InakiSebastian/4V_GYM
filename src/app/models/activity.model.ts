import { Instructor } from "./instructor.model";

export class Activity {
    activityName: string;
    activityType: string;
    instructorList: Instructor[];

    constructor(activityName: string, activityType: string, instructorList: Instructor[]) {
        this.activityName = activityName;
        this.activityType = activityType;
        this.instructorList = instructorList;
    }

    toString() {
        return `Activity: ${this.activityName} of type: ${this.activityType} with instructors: ${this.instructorList}`;
    }   
}
