import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { debounceTime } from 'rxjs';
import { fadeIn } from '../../animations/fade.animation';
import * as KanbanBoardModels from '../../models/kanban-board.model';
import { KanbanBoardService } from '../../services/kanban-board.service';
import * as KanbanBoardTypes from '../../types/kanban-board.type';
import { AddTaskComponent } from './add-task/add-task.component';

const MaterialModules = [
  MatIconModule,
  DragDropModule,
  MatTooltipModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatBadgeModule,
  NgxSkeletonLoaderModule,
  MatDialogModule,
];

const Dialogs = [AddTaskComponent];

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, FormsModule, ReactiveFormsModule, ...Dialogs, ...MaterialModules],
  templateUrl: './kanban-board.component.html',
  host: {
    class: 'h-full p-4 flex flex-col gap-6',
  },
  animations: [fadeIn],
})
export class KanbanBoardComponent {
  #cdr = inject(ChangeDetectorRef);
  #destroyRef = inject(DestroyRef);
  #kanbanBoardService = inject(KanbanBoardService);
  #dialog = inject(MatDialog);

  board = new KanbanBoardModels.KanbanBoard(
    'Task list',
    signal([new KanbanBoardModels.Column('todo', signal([])), new KanbanBoardModels.Column('inprogress', signal([])), new KanbanBoardModels.Column('done', signal([]))])
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

    this.searchControl.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
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
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    if (event.previousContainer.id !== event.container.id) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.syncTasks();
  }

  addTask() {
    const dialogSettings: MatDialogConfig = {
      minWidth: '45vw',
      maxWidth: '95vw',
      maxHeight: '75vh',
      autoFocus: false,
      disableClose: true,
    };
    const dialogRef = this.#dialog.open(AddTaskComponent, dialogSettings);
    dialogRef.afterClosed().subscribe((res) => {
      this.board.addTask(res.data, 'todo');
      this.syncTasks();
    });
  }

  deleteTask(task: KanbanBoardModels.Task) {
    this.board.deleteTask(task._id, task.status);
    this.syncTasks();
  }

  updateTaskStatus(task: KanbanBoardModels.Task, status: KanbanBoardTypes.TaskStatusCode) {
    this.board.moveTask(task._id, status);
    this.syncTasks();
  }

  syncTasks() {
    this.syncTasksStatus();
    this.#kanbanBoardService.updateLocalStorageDumpTasks(this.board);
    this.#cdr.detectChanges();
  }

  syncTasksStatus() {
    this.board.columns().forEach((column) => {
      column.tasks().forEach((task) => {
        if (task) {
          task.status = column.name;
        }
      });
    });
  }
}
