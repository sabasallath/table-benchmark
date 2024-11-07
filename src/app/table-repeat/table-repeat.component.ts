import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { GeneratorParam, TableData } from '../app.type';
import { TableRawComponent } from '../table-raw/table-raw.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-repeat',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent, TableRawComponent],
  templateUrl: './table-repeat.component.html',
  styleUrl: './table-repeat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRepeatComponent implements OnInit {
  private static readonly initialRepeatValue = 50;
  repeatFormControlName = 'repeatInput';
  fb = inject(FormBuilder);
  repeatForm!: FormGroup;

  generatorParam = input<GeneratorParam | null>();
  data = input<TableData | null>();
  isRawTemplate = input<boolean | null>(null);
  repeatValue = signal<number>(TableRepeatComponent.initialRepeatValue);
  repeatRange = computed<number[]>(() => {
    const range = [];
    for (let i = 0; i < this.repeatValue(); i++) {
      range.push(i);
    }
    return range;
  });

  ngOnInit(): void {
    this.repeatForm = this.fb.group({
      repeatInput: [TableRepeatComponent.initialRepeatValue],
    });

    const repeatInput = this.repeatForm.get(this.repeatFormControlName);
    if (repeatInput) {
      repeatInput.valueChanges
        .pipe(debounceTime(60), distinctUntilChanged())
        .subscribe(value => this.repeatValue.set(Number.parseInt(value)));
    }
  }
}
