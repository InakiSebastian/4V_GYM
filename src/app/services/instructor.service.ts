import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private _instructors: Instructor[] = [];

  updateSubject: ReplaySubject<any> = new ReplaySubject();
  changesOnInstructors: Observable<any> = this.updateSubject.asObservable();

  constructor(private http: HttpClient) {
    // this._instructors = this.generateInstructors();
   }
  //  private generateInstructors(): Instructor[] {
  //   return [
  //     new Instructor("Miguel", "Miguel.gilmour@4vientos.com", 1234567890),
  //     new Instructor("María", "María.james@4vientos.com", 1234567891),
  //     new Instructor("Iban", "Iban.lee@4vientos.com", 1234567892),
  //     new Instructor("David ", "David.metheny@4vientos.com", 1234567893),
  //     new Instructor("Arantxa", "Arantxa.brown@4vientos.com", 1234567894),
  //     new Instructor("Amaya", "Amaya.moore@4vientos.com", 1234567895)
  //   ];
  // }

  public getInstructors(): Instructor[] {
    return this._instructors;
  }

  getAllInstructors():Observable<Instructor[]>{
    return this.http.get<Instructor[]>('https://678d41e7f067bf9e24e9ccd1.mockapi.io/4vgym/instructors');
  }

  setInstructors(instructorData: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>('https://678d41e7f067bf9e24e9ccd1.mockapi.io/4vgym/instructors', instructorData);

  }

  updateInstructors(instructorData: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>('https://678d41e7f067bf9e24e9ccd1.mockapi.io/4vgym/instructors/'+instructorData.id, instructorData);
  }

  deleteInstructors(id: number): Observable<Instructor> {
    return this.http.delete<Instructor>('https://678d41e7f067bf9e24e9ccd1.mockapi.io/4vgym/instructors/'+id);
  }
  
  

  notifyUpdateContact(data: any) {
    this.updateSubject.next(data)
  }

  

   
}
