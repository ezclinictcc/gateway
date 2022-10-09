import { CommonEntity } from "../../../entities/common/CommonEntity";
import { IColumnSchema, IDBSchema } from "../../../entities/schemas";
import { IBaseConnection } from "../interfaces/IBaseConnection";
import { IRepository } from "../interfaces/IRepository";

class CommonRepository<T extends CommonEntity>
  implements IRepository<CommonEntity>
{
  private dbName: string;

  public constructor(dbName: string) {
    this.dbName = dbName;
  }

  getRepository(): void {
    throw new Error("Method not implemented.");
  }

  async findById(
    id: string,
    repositoryManager: IBaseConnection
  ): Promise<CommonEntity[]> {
    const connection = repositoryManager.obtainConnection();
    const sql: string = `SELECT * FROM ${this.dbName} where id = '${id}'`;
    const result = await connection.query(sql);
    return result;
  }

  async create(
    entity: T,
    repositoryManager: IBaseConnection
  ): Promise<CommonEntity> {
    const schema: IDBSchema = entity.dbSchema;
    let sqlValues: string = "";
    let sqlColumns: string = "";
    schema.columns.forEach((column: IColumnSchema) => {
      if (column.name && entity[column.name]) {
        console.log(column.name, " - ", entity[column.name]);
        sqlColumns += `"${column.name}",`;
        sqlValues += `'${entity[column.name]}',`;
      }
      if (column.name === "created_at") {
        sqlColumns += `"${column.name}",`;
        sqlValues += "CURRENT_TIMESTAMP,";
      }
    });
    sqlColumns = sqlColumns.substring(0, sqlColumns.length - 1);
    sqlValues = sqlValues.substring(0, sqlValues.length - 1);

    const sql: string = `INSERT INTO ${this.dbName} ( ${sqlColumns} ) VALUES ( ${sqlValues} ) `;
    const connection = await repositoryManager.obtainConnection();
    const queryRunner = connection.createQueryRunner();
    let result = null;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.query(sql);
      result = await this.get(entity.id, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async delete(
    entity: T,
    repositoryManager: IBaseConnection
  ): Promise<CommonEntity> {
    const schema: IDBSchema = entity.dbSchema;
    let idColumnName: string = null;
    schema.columns.forEach((column: IColumnSchema) => {
      if (column.name && column.name === "id") {
        idColumnName = column.name;
      }
    });
    const sql: string = `DELETE FROM ${this.dbName} WHERE ${idColumnName} = '${entity.id}'`;
    const connection = repositoryManager.obtainConnection();
    const queryRunner = connection.createQueryRunner();
    let result = null;
    try {
      await queryRunner.connect();
      result = await this.get(entity.id, queryRunner);
      await queryRunner.startTransaction();
      await queryRunner.query(sql);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return result;
  }

  async find(
    entity: T,
    repositoryManager: IBaseConnection
  ): Promise<CommonEntity[]> {
    const schema: IDBSchema = entity.dbSchema;
    let sqlValues: string = "";

    schema.columns.forEach((column: IColumnSchema) => {
      if (column.name && entity[column.name]) {
        sqlValues += ` AND "${column.name}" = '${entity[column.name]}'`;
      }
    });

    const sql: string = `SELECT * FROM ${this.dbName}  WHERE 1 = 1 ${sqlValues}  `;
    const connection = await repositoryManager.obtainConnection();
    const queryRunner = connection.createQueryRunner();
    try {
      await queryRunner.connect();
      return await queryRunner.query(sql);
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    entity: T,
    repositoryManager: IBaseConnection
  ): Promise<CommonEntity> {
    const connection = repositoryManager.obtainConnection();
    const queryRunner = connection.createQueryRunner();
    let result = null;
    try {
      const schema: IDBSchema = entity.dbSchema;
      let updateValues: string = "";

      schema.columns.forEach((column: IColumnSchema) => {
        if (column.name && entity[column.name] && column.name !== "id") {
          updateValues += `"${column.name}" = '${entity[column.name]}',`;
        }
      });
      updateValues = updateValues.substring(0, updateValues.length - 1);

      const sql: string = `UPDATE ${this.dbName} SET ${updateValues} WHERE id = '${entity.id}'`;

      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.query(sql);
      result = await this.get(entity.id, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return result;
  }

  async get(id: string, queryRunner: any): Promise<CommonEntity[]> {
    const sql: string = `SELECT * FROM ${this.dbName} WHERE ID = '${id}' `;
    await queryRunner.connect();
    await queryRunner.query(sql);
    return queryRunner.query(sql);
  }
}

export default CommonRepository;
