import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }


  // * Without observable
  // ngOnInit(): void {
  //   this.tasks = this.taskService.getTasks()
  // }

  // * With observable
  ngOnInit(): void {
    // similar to Promises then catch
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTasks(task).subscribe(() => {
      // * Filter the recently deleted task from the ui
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task).subscribe();
  }
}
