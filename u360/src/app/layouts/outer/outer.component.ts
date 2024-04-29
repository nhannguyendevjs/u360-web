import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NavListComponent } from '../../components/nav-list/nav-list.component';
import { AppNavService } from '../../services/app-nav.service';

@Component({
  selector: 'app-outer',
  standalone: true,
  imports: [CommonModule, NavBarComponent, NavListComponent],
  templateUrl: './outer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OuterComponent {
  appNavService = inject(AppNavService);
}
