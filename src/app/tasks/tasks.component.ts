import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { DUMMY_TASKS } from './dummy-tasks';
import { NewTask, Task } from './task.model';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) username?: string;
  @Input({ required: true }) userId?: string;
isAddingTask = false;
  tasks: Task[] = DUMMY_TASKS;

  get selectedUserTasks() {
    return this.tasks.filter((p) => p.userId === this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((p) => p.id != id);
  }

  onCancelAddTask(){
    this.isAddingTask = false;
  }

  onAddTask(newTask: NewTask){
    debugger;

    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: this.userId!,
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.date,
    });

    this.isAddingTask = false;

  }
}
