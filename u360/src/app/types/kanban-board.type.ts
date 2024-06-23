import { WritableSignal } from '@angular/core';
import * as UserTypes from '../types/users.type';

export type TaskStatusCode = 'todo' | 'inprogress' | 'done';

export type TaskStatusName = 'To do' | 'In progress' | 'Done';

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignee: UserTypes.User;
};

export type Column = {
  title: string;
  tasks: WritableSignal<Task[]>;
  addTask: (task: Task) => Task[];
  removeTask: (taskId: string) => Task[];
};

export type KanbanBoard = {
  title: string;
  columns: WritableSignal<Column[]>;
};
