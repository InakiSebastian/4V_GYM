import { Instructor } from "./instructor.model";

export class Activity {
    id?: number;
    name: string;
    icon: string;
    dateStart: Date;
    dateEnd: Date;
    instructors: string[];

    constructor(activityName: string, activityType: string, dateStart: Date, dateEnd: Date, instructors: string[], id?: number) {
        this.id =  id;
        this.name = activityName;
        this.icon = (!activityType.startsWith("fa-solid"))? this.getIconDefault() : activityType;
        this.instructors = instructors;
        this.dateStart = (dateStart instanceof Date) ? dateStart : new Date(dateStart * 1000);
        this.dateEnd = (dateEnd instanceof Date) ? dateEnd : new Date(dateEnd * 1000);
    }


    public setInstructor(nameInstructor: string, index: number) {
        if (this.instructors && index >= 0 && index < this.instructors.length) {
            this.instructors[index] = nameInstructor;
        } else {
            console.error("Índice fuera de rango o instructorList no inicializado");
        }
    }

    public setId(id:number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    toString() {
        return `Activity: ${this.name} of type: ${this.icon} with instructors: ${this.instructors}`;
    }
    
    private getIconDefault():string{
        const icons = [
          "fa-solid fa-bicycle fa-2xl",
          "fa-solid fa-person-swimming fa-2xl",
          "fa-solid fa-person-skating fa-2xl",
          "fa-solid fa-weight-hanging fa-2xl",
          "fa-solid fa-table-tennis-paddle-ball fa-2xl"
        ];
        const randomIndex = Math.floor(Math.random() * icons.length); // Índice aleatorio
        return icons[randomIndex];
      }
    
}
