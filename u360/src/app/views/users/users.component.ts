import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { UsersColumns } from '../../enums/users';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/users.type';
import { CdkDataSource } from '../../utils/cdk/data-source';

const MaterialModules = [MatTableModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules, InfiniteScrollDirective],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  #usersService = inject(UsersService);

  displayedColumns = UsersColumns;
  dataSource = new CdkDataSource<User>();

  searchControl = new FormControl('');

  constructor() {
    this.loadUsers();
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.clearUsers();
      this.loadUsers();
    });
  }

  clearUsers() {
    this.dataSource.data.next([]);
  }

  loadUsers() {
    this.#usersService.search().subscribe((res) => {
      if (res.success) {
        const users = [
          ...this.dataSource.data.value,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
        ];

        this.dataSource.data.next(users.filter((user) => user.name.toLowerCase().includes(this.searchControl.value.trim().toLowerCase())));
      }
    });
  }

  onClearSearch() {
    this.searchControl.setValue('');
    this.clearUsers();
    this.loadUsers();
  }
}
