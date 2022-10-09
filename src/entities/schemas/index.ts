export interface IColumnSchema {
    name?:string,
    type?:string,
    isPrimary?:boolean,
    isNullable?:boolean,
    default?:string
  }

export interface IDBSchema{
    name:string,
    columns:IColumnSchema[]
  }
