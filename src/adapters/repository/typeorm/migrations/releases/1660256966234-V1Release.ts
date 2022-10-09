import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

const profileForeignKey = new TableForeignKey({
  columnNames: ["idProfile"],
  referencedColumnNames: ["id"],
  referencedTableName: "profile",
  name: "user_x_profile",
});

const userTypeForeignKey = new TableForeignKey({
  columnNames: ["idUserType"],
  referencedColumnNames: ["id"],
  referencedTableName: "user_type",
  name: "user_x_user_type",
});

export class V1Release1660256966234 implements MigrationInterface {
  // CREATE USER RELATION WITH PROFILE
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("users", [profileForeignKey]);
    await queryRunner.createForeignKeys("users", [userTypeForeignKey]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("users", [profileForeignKey]);
    await queryRunner.dropForeignKeys("users", [userTypeForeignKey]);
  }
}
