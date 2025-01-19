export class Instructor {
    name: string;
    email: string;
    telf: number;

    constructor(name: string, email: string, telf: number) {
        this.name = name;
        this.email = email;
        this.telf = telf;
    }

    toString() {
        return `Instructor: ${this.name} with email: ${this.email} and telf: ${this.telf}`;
    }
}
