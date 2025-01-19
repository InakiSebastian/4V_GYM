export class Instructor {
    id:number;
    name: string;
    email: string;
    telf: number;

    constructor(id:number,name: string, email: string, telf: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telf = telf;
    }


    toString() {
        return `Instructor: ${this.name} with email: ${this.email} and telf: ${this.telf}`;
    }
}
