export type GeneratorParam = {
  seed: number;
  length: number;
};

export type User = {
  name: string;
  phoneNumber: string;
  age: number;
  address: string;
  company: string;
  yearsOfExperience: number;
  favoriteColor: string;
};

export type HeaderData = {
  name: string;
  phoneNumber: string;
  age: string;
  address: string;
  company: string;
  yearsOfExperience: string;
  favoriteColor: string;
};

export type TableData = {
  headerData: HeaderData;
  rowData: RowData;
};

export type Cell = User;
export type RowData = Cell[];
