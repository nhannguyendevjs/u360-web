import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

const MaterialModules = [MatToolbarModule, MatSelectModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule];

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './user-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFiltersComponent {
  readonly userRoles = ['Admin', 'Member'];

  selectedRoles = new FormControl('');
}
