import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../interfaces/student";
@Injectable()
export class StudentsService {
  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  getStudents(): Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl + 'student');
  }

  saveStudent(student: Student): Observable<boolean> {
    return this._http.post<boolean>(this.baseUrl + 'student', student);
  }

  editStudent(student: Student): Observable<boolean> {
    return this._http.put<boolean>(this.baseUrl + 'student', student);
  }

  deleteStudent(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + 'student' + '/' + id);
  }
}
