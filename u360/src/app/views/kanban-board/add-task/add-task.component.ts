import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import * as KanbanBoardModels from '../../../models/kanban-board.model';

const MaterialModules = [MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule];

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './add-task.component.html',
  host: {
    class: 'block p-4',
  },
})
export class AddTaskComponent {
  #dialogRef = inject(MatDialogRef<AddTaskComponent>);

  title = '';
  description = '';

  addTask() {
    const newTask = new KanbanBoardModels.Task(
      uuidv4(),
      this.title,
      this.description,
      'todo',
      {
        _id: uuidv4(),
        name: 'Nhan Nguyen',
        email: 'hoainhaannguyen@gmail.com',
        phone: '+84 346 528 526',
        address: 'Ho Chi Minh City, Vietnam',
        role: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/4723119?v=4',
      },
      0
    );
    this.#dialogRef.close({ data: newTask });
  }
}
