import { IDBSchema } from "../schemas";

export class CommonEntity {
  public readonly id: string;

  public readonly dbSchema;

  constructor(id: string, dbSchema:IDBSchema) {
    this.id = id;
    this.dbSchema = dbSchema;
  }
}
