import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TASKS } from 'src/app/mock-tasks';
import { Task } from 'src/app/Task';
import {
  Observable, of
} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = "http://localhost:5000/tasks";

  constructor(private http:HttpClient) { }

  // * Without observable
  // getTasks(): Task[] {
  //   return TASKS;
  // }

  // // * With observable
  // getTasks(): Observable<Task[]> {
  //   // * of makes TASKS into observables
  //   const tasks = of(TASKS)
  //   return tasks;
  // }

  // * With observable and dummy bd
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  deleteTasks(task: Task): Observable<Task> {
    const url = `${this.apiURL}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, task, httpOptions);
  }

  toggleReminder(task: Task): Observable<Task> {
    const url = `${this.apiURL}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
}
