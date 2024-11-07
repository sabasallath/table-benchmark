import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneratorParam, TableData } from '../app.type';
import { DataService } from '../services/data.service';
import { TableRepeatComponent } from '../table-repeat/table-repeat.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-data-loader',
  standalone: true,
  imports: [TableComponent, TableRepeatComponent],
  templateUrl: './data-loader.component.html',
  styleUrl: './data-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataLoaderComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  dataService = inject(DataService);

  private subs: Subscription[] = [];
  generatorParam = signal<GeneratorParam | null>(null);

  isRawTemplate = signal<boolean>(false);

  data = computed<TableData | null>(() => {
    const generatorParam = this.generatorParam();
    if (generatorParam) {
      console.time('generate');
      const tableData = this.dataService.generate(generatorParam);
      console.timeEnd('generate');
      console.log(tableData);
      return tableData;
    } else {
      return null;
    }
  });

  ngOnInit(): void {
    this.subs.push(
      this.route.queryParamMap.subscribe(params => {
        const rawParam = params.get('raw');
        const rawBoolean = rawParam === 'true';
        this.isRawTemplate.set(rawBoolean);
      }),
      this.route.paramMap.subscribe(params => {
        const seed = params.get('seed');
        const length = params.get('length');
        if (seed) {
          try {
            const nSeed = Number.parseInt(seed);
            if (length) {
              const nLength = Number.parseInt(length);
              const generatorParam: GeneratorParam = { seed: nSeed, length: nLength };
              this.generatorParam.set(generatorParam);
            } else {
              console.error('No length generator param');
            }
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error('No seed generator param');
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
