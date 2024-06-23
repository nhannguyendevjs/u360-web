import { WritableSignal } from '@angular/core';
import * as UserTypes from '../types/users.type';

export class Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignee: UserTypes.User;
  index: number;

  constructor(_id: string, title: string, description: string, status: string, assignee: UserTypes.User, index: number) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.assignee = assignee;
    this.index = index;
  }
}

export class Column {
  name: string;
  tasks: WritableSignal<Task[]>;

  constructor(name: string, tasks: WritableSignal<Task[]>) {
    this.name = name;
    this.tasks = tasks;
  }

  addTask(task: Task) {
    this.tasks.update((value) => {
      value.unshift(task);
      return value;
    });
    return this.tasks();
  }

  removeTask(taskId: string) {
    this.tasks.update((value) => {
      value = value.filter((task) => task._id !== taskId);
      return value;
    });
    return this.tasks();
  }
}

export class KanbanBoard {
  title: string;
  columns: WritableSignal<Column[]>;

  constructor(title: string, columns: WritableSignal<Column[]>) {
    this.title = title;
    this.columns = columns;
  }
}
