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
}

export class KanbanBoard {
  title: string;
  columns: WritableSignal<Column[]>;

  constructor(title: string, columns: WritableSignal<Column[]>) {
    this.title = title;
    this.columns = columns;
  }

  clearAll() {
    this.columns().forEach((column) => {
      column.tasks.set([]);
    });
  }

  clearColumn(columnName: string) {
    const column = this.columns().find((column) => column.name === columnName);
    if (column) {
      column.tasks.set([]);
    }
  }

  addTask(task: Task, columnName: string) {
    const column = this.columns().find((column) => column.name === columnName);
    if (column) {
      column.tasks.update((value) => {
        value.unshift(task);
        return value;
      });
    }
    return column.tasks();
  }

  moveTask(taskId: string, columnName: string) {
    const destinationColumn = this.columns().find((column) => column.name === columnName);
    const sourceColumn = this.columns().find((column) => column.tasks().find((item) => item._id === taskId));
    if (destinationColumn) {
      destinationColumn.tasks.update((value) => {
        value.unshift(sourceColumn.tasks().find((item) => item._id === taskId));
        return value;
      });
    }
    if (sourceColumn) {
      sourceColumn.tasks.update((value) => {
        value = value.filter((item) => item._id !== taskId);
        return value;
      });
    }
    return destinationColumn.tasks();
  }

  deleteTask(taskId: string, columnName: string) {
    const column = this.columns().find((column) => column.name === columnName);
    if (column) {
      column.tasks.update((value) => {
        value = value.filter((item) => item._id !== taskId);
        return value;
      });
    }
    return column.tasks();
  }
}
