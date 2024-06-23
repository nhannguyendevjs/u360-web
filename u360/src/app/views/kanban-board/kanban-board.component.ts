import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForOf, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { fadeIn } from '../../animations/fade.animation';
import * as KanbanBoardModels from '../../models/kanban-board.model';
import { KanbanBoardService } from '../../services/kanban-board.service';
import * as KanbanBoardTypes from '../../types/kanban-board.type';

const MaterialModules = [MatIconModule, DragDropModule, MatTooltipModule, MatCardModule, MatMenuModule, MatDialogModule, MatSelectModule, MatButtonModule];

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './kanban-board.component.html',
  host: {
    class: 'h-full p-4 flex flex-col gap-6',
  },
  animations: [fadeIn],
})
export class KanbanBoardComponent {
  #destroyRef = inject(DestroyRef);
  #kanbanBoardService = inject(KanbanBoardService);

  board = new KanbanBoardModels.KanbanBoard(
    'Task list',
    signal([
      new KanbanBoardModels.Column('todo', signal([])),
      new KanbanBoardModels.Column('inprogress', signal([])),
      new KanbanBoardModels.Column('done', signal([])),
    ]),
  );

  searchControl = new FormControl('');
  taskList: KanbanBoardModels.Task[] = [];

  constructor() {
    // ----------------------------------------------------------------
    // Junk code written by Nhan Nguyen
    // ----------------------------------------------------------------
    this.#kanbanBoardService.dumpTasks();
    // ----------------------------------------------------------------
    // End of Junk code written by Nhan Nguyen
    // ----------------------------------------------------------------
  }

  ngOnInit() {
    this.loadTasks();
    this.loadBoard();

    this.searchControl.valueChanges.pipe(debounceTime(500), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.loadTasks();
      this.loadBoard();
    });
  }

  loadTasks() {
    this.taskList = this.#kanbanBoardService.getTasks(this.searchControl.value.trim().toLocaleLowerCase());
  }

  getTaskGroups() {
    const columns = this.taskList.reduce(
      (acc, cur) => {
        acc[cur.status] = acc[cur.status] || [];
        acc[cur.status].push(cur);
        return acc;
      },
      { todo: [], inprogress: [], done: [] } as Record<KanbanBoardTypes.TaskStatusCode, KanbanBoardModels.Task[]>
    );

    return columns;
  }

  loadBoard() {
    const taskGroups = this.getTaskGroups();
    this.board.columns.update((columns) => {
      columns.forEach((column) => {
        column.tasks.set(taskGroups[column.name] ?? []);
      });
      return columns;
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data(), event.previousIndex, event.currentIndex);
    }
    if (event.previousContainer.id !== event.container.id) {
      transferArrayItem(event.previousContainer.data(), event.container.data(), event.previousIndex, event.currentIndex);
    }
  }
}
