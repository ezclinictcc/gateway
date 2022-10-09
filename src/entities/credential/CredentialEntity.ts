import { CommonEntity } from "../common/CommonEntity";
import { IDBSchema } from "../schemas";

export const CredentialSchema: IDBSchema = {
  name: "credential",
  columns: [
    {
      name: "id",
      type: "uuid",
      isPrimary: true,
      isNullable: false,
    },
    {
      name: "login",
      type: "varchar",
      isNullable: false,
    },
    {
      name: "password",
      type: "varchar",
      isNullable: false,
    },
    {
      name: "createdAt",
      type: "timestamp",
      default: "now()",
      isNullable: true,
    },
  ],
};

export class CredentialEntity extends CommonEntity {
  public readonly id: string;

  public readonly login: string;

  public readonly password: string;

  public readonly createdAt: Date;

  public constructor(
    id: string,
    login: string,
    password: string,
    createdAt: Date
  ) {
    super(id, CredentialSchema);
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
    Object.freeze(this);
  }
}
