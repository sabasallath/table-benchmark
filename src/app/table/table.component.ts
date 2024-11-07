import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableData } from '../app.type';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  protected readonly Object = Object;
  data = input<TableData | null>();
  isActive: boolean = false;

  onClickHandler($event: MouseEvent) {
    console.log($event);
  }

  activateTableInteraction() {
    console.log('Activate table');
    this.isActive = true;
  }

  deactivateTableInteraction() {
    console.log('Deactivate table');
    this.isActive = false;
  }
}
