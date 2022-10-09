import { TableColumnOptions } from "typeorm";
import { IColumnSchema, IDBSchema } from "../../../../../../entities/schemas";

export function createTableOptions(schema: IDBSchema): TableColumnOptions[] {
  const tableColumnOptions: TableColumnOptions[] = schema.columns.map(
    (column: IColumnSchema) => {
      const tableColumnOptions: TableColumnOptions = {
        name: column.name,
        type: column.type,
        isPrimary: column.isPrimary,
        isNullable: column.isNullable,
      };
      if (column.name === "id") {
        tableColumnOptions.isUnique = true;
      }
      return tableColumnOptions;
    }
  );
  return tableColumnOptions;
}
