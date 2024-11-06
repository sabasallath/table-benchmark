import { Component, input } from '@angular/core';
import { Cell, HeaderData, TableData } from '../app.type';

/**
 *   <div class="table-container">
 *     <table>
 *       <thead>
 *         <tr>
 *           @for (cell of Object.values(tableData.headerData); track $index) {
 *             <th>{{ cell }}</th>
 *           }
 *         </tr>
 *       </thead>
 *       <tbody>
 *         @for (row of tableData.rowData; track $index) {
 *           <tr>
 *             @for (cell of Object.values(row); track $index) {
 *               <td>{{ cell }}</td>
 *             }
 *           </tr>
 *         }
 *       </tbody>
 *     </table>
 *   </div>
 */
@Component({
  selector: 'app-table-raw',
  standalone: true,
  imports: [],
  templateUrl: './table-raw.component.html',
  styleUrl: './table-raw.component.scss',
})
export class TableRawComponent {
  data = input<TableData | null>();
  repeat = input<number | null>();
  rawHtml: string;

  constructor() {
    this.rawHtml = this.buildRaw();
  }

  buildRaw(): string {
    const data = this.data();
    const repeat = this.repeat();
    const acc: string[] = [];
    if (data && repeat) {
      for (let i = 0; i < repeat; i++) {
        acc.push(`<span>N°${i}</span>`);
        this.buildTable(acc, data);
      }
      return acc.join('');
    } else {
      return '';
    }
  }

  private buildTable(acc: string[], tableData: TableData): void {
    const { rowData, headerData } = tableData;
    acc.push('<div class="table-container raw"><table>');
    this.buildHeader(acc, headerData);
    acc.push('<tbody>');
    for (let i = 0; i < rowData.length; i++) {
      this.buildRow(acc, rowData[i]);
    }
    acc.push('</tbody>');
    acc.push('</table></div>');
  }

  private buildHeader(acc: string[], headerData: HeaderData): void {
    acc.push('<thead>');
    acc.push('<tr>');
    const values = Object.values(headerData);
    for (let i = 0; i < values.length; i++) {
      acc.push('<th>');
      acc.push(values[i].toString());
      acc.push('</th>');
    }
    acc.push('</thead>');
  }

  private buildRow(acc: string[], cell: Cell): void {
    acc.push('<tr>');
    const values = Object.values(cell);
    for (let i = 0; i < values.length; i++) {
      acc.push('<td>');
      acc.push(values[i].toString());
      acc.push('</td>');
    }
    acc.push('</tr>');
  }
}
