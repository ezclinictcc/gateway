import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { ClinicTypeSchema } from "../../../../../entities/clinic-type/ClinicTypeEntity";
import { ProfileSchema } from "../../../../../entities/profile/ProfileEntity";
import {
  PROFILE_ACTIONS,
  PROFILE_TYPES,
} from "../../../../../entities/profile/ProfileEnums";
import { UserTypeSchema } from "../../../../../entities/user-type/UserTypeEntity";
import { UserSchema } from "../../../../../entities/user/UserEntity";
import { UuidGeneratorAdapter } from "../../../uuid/UuidGeneratoryAdapter";

export class V2Release1660256966235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const uuid = new UuidGeneratorAdapter();

    // CREATE USER TYPES
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
    );

    // CREATE PROFILES
    await queryRunner.query(
      `INSERT INTO ${ProfileSchema.name} VALUES ('${uuid.createId()}','${
        PROFILE_TYPES.MANAGER
      }', '${PROFILE_ACTIONS.USER};${PROFILE_ACTIONS.PROFILE};${
        PROFILE_ACTIONS.CLINIC_SEARCH
      };${PROFILE_ACTIONS.DOCTOR_SCHEDULE}; ${
        PROFILE_ACTIONS.REPORTS
      }', CURRENT_TIMESTAMP)`
    );

    await queryRunner.query(
      `INSERT INTO ${ProfileSchema.name} VALUES ('${uuid.createId()}','${
        PROFILE_TYPES.DOCTOR
      }', '${PROFILE_ACTIONS.CLINIC_SEARCH};${
        PROFILE_ACTIONS.DOCTOR_SCHEDULE
      }', CURRENT_TIMESTAMP)`
    );

    await queryRunner.query(
      `INSERT INTO ${ProfileSchema.name} VALUES ('${uuid.createId()}','${
        PROFILE_TYPES.PATIANT
      }', '${PROFILE_ACTIONS.CLINIC_SEARCH}', CURRENT_TIMESTAMP)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error("Not implemented");
  }
}
