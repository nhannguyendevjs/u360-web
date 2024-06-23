import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersLayoutService } from '../../../services/users-layout.service';

const MaterialModules = [MatToolbarModule, MatSelectModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule];

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './user-filters.component.html',
})
export class UserFiltersComponent {
  #usersLayoutService = inject(UsersLayoutService);

  changed = output<{ roles: string[] }>();

  readonly userRoles = ['Admin', 'Member'];

  selectedRoles = new FormControl([], { nonNullable: true });

  closeFilters() {
    this.#usersLayoutService.userFilters().toggle();
  }

  applyFilters() {
    this.changed.emit({
      roles: this.selectedRoles.value,
    });
  }

  resetFilters() {
    this.selectedRoles.reset();
    this.applyFilters();
  }
}
