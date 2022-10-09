import { MigrationInterface, QueryRunner, Table, TableOptions } from "typeorm";
import { LoginSchema } from "../../../../../entities/login/LoginEntity";
import { createTableOptions } from "../utils/functions";

export class CreateLogin1659896492936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* const userTypeTableOptions: TableOptions = {
      name: UserTypeSchema.name,
    };
    userTypeTableOptions.columns = createTableOptions(UserTypeSchema);

    await queryRunner.createTable(new Table(userTypeTableOptions)); */

    /* const uuid = new UuidGeneratorAdapter();
    await queryRunner.query(
      `INSERT INTO ${
        UserTypeSchema.name
      } VALUES ('${uuid.createId()}','PATIANT')`
    );

    await queryRunner.query(
      `INSERT INTO ${
        UserTypeSchema.name
      } VALUES ('${uuid.createId()}','DOCTOR')`
    );

    await queryRunner.query(
      `INSERT INTO ${
        UserTypeSchema.name
      } VALUES ('${uuid.createId()}','MANAGER')`
    ); */

    const tableOptions: TableOptions = {
      name: LoginSchema.name,
      /* foreignKeys: [
        {
          columnNames: ["id_user_type"],
          referencedColumnNames: ["id"],
          referencedTableName: "user_type",
        },
      ], */
    };
    tableOptions.columns = createTableOptions(LoginSchema);
    await queryRunner.createTable(new Table(tableOptions), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("login");
  }
}
