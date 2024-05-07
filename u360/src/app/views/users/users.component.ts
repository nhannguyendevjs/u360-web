import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { UsersColumns } from '../../enums/users';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/users.type';
import { CdkDataSource } from '../../utils/cdk/data-source';
import { UserFiltersComponent } from './user-filters/user-filters.component';
import { UsersLayoutService } from '../../services/users-layout.service';

const MaterialModules = [MatSidenavModule, MatTableModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatBadgeModule];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules, InfiniteScrollDirective, UserFiltersComponent],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  #usersService = inject(UsersService);
  #usersLayoutService = inject(UsersLayoutService);

  userFilters = viewChild.required(MatDrawer);

  displayedColumns = UsersColumns;
  dataSource = new CdkDataSource<User>();

  isTableEmpty = signal(true);

  searchControl = new FormControl('');

  filters = signal({ roles: [] });
  filtersCounter = signal(0);

  constructor() {
    this.loadUsers();
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.clearUsers();
      this.loadUsers();
    });
  }

  ngAfterViewInit() {
    this.#usersLayoutService.userFilters = this.userFilters;
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

        const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(this.searchControl.value.trim().toLowerCase()));

        this.isTableEmpty.set(filteredUsers.length === 0);

        this.dataSource.data.next(filteredUsers);
      }
    });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.clearUsers();
    this.loadUsers();
  }

  filtersChanged(event: { roles: string[] }) {
    this.filters.set(event);
    this.filtersCounter.set(event.roles.length > 0 ? 1 : 0);
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }
}
