import * as chance from 'chance';
import { GeneratorParam, HeaderData, RowData, TableData, User } from '../app.type';

class Generator {
  private c: Chance.Chance;
  private tableData: TableData | null = null;
  constructor(private generatorParam: GeneratorParam) {
    const { seed } = this.generatorParam;
    this.c = new chance.Chance(seed);
  }

  generate(): TableData {
    if (this.tableData) {
      return this.tableData;
    } else {
      this.tableData = this.generateTableData();
    }

    return this.tableData;
  }

  generateUser(): User {
    return {
      name: this.c.name(),
      phoneNumber: this.c.phone(),
      age: this.c.age(),
      address: this.c.address(),
      company: this.c.company(),
      yearsOfExperience: this.c.integer({ min: 0, max: 45 }),
      favoriteColor: this.c.color(),
    };
  }

  generateRowData(): RowData {
    const length = this.generatorParam.length;
    const row = [];
    for (let i = 0; i < length; i++) {
      row.push(this.generateUser());
    }
    return row;
  }

  generateHeaderData(): HeaderData {
    return {
      name: 'Name',
      phoneNumber: 'Phone number',
      age: 'Age',
      address: 'Address',
      company: 'Company',
      yearsOfExperience: 'Years of experience',
      favoriteColor: 'Favorite color',
    };
  }

  generateTableData(): TableData {
    return {
      headerData: this.generateHeaderData(),
      rowData: this.generateRowData(),
    };
  }
}

export default Generator;
