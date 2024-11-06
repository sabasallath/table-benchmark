import { Injectable } from '@angular/core';
import { GeneratorParam, TableData } from '../app.type';
import Generator from '../utils/data-generator.util';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private collection = new Map<string, TableData>();

  private toId(generatorParam: GeneratorParam) {
    const { seed, length } = generatorParam;
    return `${seed}${length}`;
  }

  generate(generatorParam: GeneratorParam): TableData {
    const id = this.toId(generatorParam);
    if (this.collection.has(id)) {
      return this.collection.get(id)!;
    } else {
      const generator = new Generator(generatorParam);
      const tableData = generator.generate();
      this.collection.set(id, tableData);
      return tableData;
    }
  }
}
