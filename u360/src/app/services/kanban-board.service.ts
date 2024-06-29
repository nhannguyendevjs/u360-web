import { Injectable } from '@angular/core';
import * as KanbanBoardModels from '../models/kanban-board.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class KanbanBoardService {
  getDumpTasks() {
    return [
      {
        _id: uuidv4(),
        title: 'Task 1',
        description: 'This is a description for task 1',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 2',
        description: 'This is a description for task 2',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 3',
        description: 'This is a description for task 3',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 4',
        description: 'This is a description for task 4',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 5',
        description: 'This is a description for task 5',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 6',
        description: 'This is a description for task 6',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 7',
        description: 'This is a description for task 7',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 8',
        description: 'This is a description for task 8',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 9',
        description: 'This is a description for task 9',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
      {
        _id: uuidv4(),
        title: 'Task 10',
        description: 'This is a description for task 10',
        status: 'todo',
        assignee: {
          _id: uuidv4(),
          name: 'Nhan Nguyen',
          email: 'hoainhaannguyen@gmail.com',
          phone: '+84 346 528 526',
          address: 'Ho Chi Minh City, Vietnam',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
        },
        index: 0,
      },
    ];
  }

  dumpTasks() {
    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : this.getDumpTasks();
    // const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateLocalStorageDumpTasks(board: KanbanBoardModels.KanbanBoard) {
    const tasks = board.columns().reduce((acc, cur) => {
      return [...acc, ...cur.tasks()];
    }, [] as KanbanBoardModels.Task[]);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(keyword: string) {
    let tasks: KanbanBoardModels.Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]') ?? [];

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.title.trim().toLowerCase().includes(keyword.toLowerCase()) || task.description.trim().toLowerCase().includes(keyword.toLowerCase());
      });
    }

    tasks = tasks.map((task) => {
      return new KanbanBoardModels.Task(task._id, task.title, task.description, task.status, task.assignee, task.index);
    });

    return tasks;
  }
}
