import { Component, input } from '@angular/core';
import { TableData } from '../app.type';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  protected readonly Object = Object;
  data = input<TableData | null>();
}
