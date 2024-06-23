import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KanbanBoardService {
  dumpTasks() {
    const tasks = [
      {
        _id: 't1',
        title: 'Task 1',
        description: 'This is a description for task 1',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't2',
        title: 'Task 2',
        description: 'This is a description for task 2',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't3',
        title: 'Task 3',
        description: 'This is a description for task 3',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't4',
        title: 'Task 4',
        description: 'This is a description for task 4',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't5',
        title: 'Task 5',
        description: 'This is a description for task 5',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't6',
        title: 'Task 6',
        description: 'This is a description for task 6',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't7',
        title: 'Task 7',
        description: 'This is a description for task 7',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't8',
        title: 'Task 8',
        description: 'This is a description for task 8',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't9',
        title: 'Task 9',
        description: 'This is a description for task 9',
        status: 'todo',
        assignee: {
          _id: 'u1',
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
        _id: 't10',
        title: 'Task 10',
        description: 'This is a description for task 10',
        status: 'todo',
        assignee: {
          _id: 'u1',
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

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(keyword: string) {
    let tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') ?? [];

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.title.trim().toLowerCase().includes(keyword.toLowerCase()) || task.description.trim().toLowerCase().includes(keyword.toLowerCase());
      });
    }

    return tasks;
  }
}
