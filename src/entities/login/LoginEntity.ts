import { CommonEntity } from "../common/CommonEntity";
import { IDBSchema } from "../schemas";

export const LoginSchema: IDBSchema = {
  name: "login",
  columns: [
    {
      name: "id",
      type: "uuid",
      isPrimary: true,
      isNullable: false,
    },
    {
      name: "token",
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

export class LoginEntity extends CommonEntity {
  public readonly id: string;

  public readonly login: string;

  public readonly password: string;

  public readonly token: string;

  public readonly createdAt: Date;

  public constructor(id: string, token: string, createdAt: Date) {
    super(id, LoginSchema);
    this.token = token;
    this.createdAt = createdAt;
    Object.freeze(this);
  }
}
