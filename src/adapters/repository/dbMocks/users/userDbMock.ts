/* eslint-disable spaced-comment */
import { BaseError } from "../../../../entities/errors/BaseError";
import { UserEntity } from "../../../../entities/user/UserEntity";
import { REPOSITORY_ERRORS } from "../../../../usecases/repository/errors/repositoryErros";
import { IBaseConnection } from "../../../../usecases/repository/interfaces/IBaseConnection";
import { IRepository } from "../../../../usecases/repository/interfaces/IRepository";
import { findMatchAttributes, findNotNullAttributes } from "../mockFunctions";

export class DbMockUser implements IRepository<UserEntity> {
  private static INSTANCE: any;

  public db: UserEntity[] = [];

  getRepository(): void {
    throw new Error("Method not implemented.");
  }

  createConnection(): void {
    throw new Error("Method not implemented.");
  }

  public static getInstance(): DbMockUser {
    if (!DbMockUser.INSTANCE) {
      DbMockUser.INSTANCE = new DbMockUser();
    }
    return DbMockUser.INSTANCE;
  }

  create(
    entity: UserEntity,
    repositoryManager: IBaseConnection
  ): Promise<UserEntity> {
    this.db.push(entity);
    return new Promise((resolve, reject) => {
      resolve(entity);
    });
  }

  delete(
    entity: UserEntity,
    repositoryManager: IBaseConnection
  ): Promise<UserEntity> {
    this.db = this.db.filter((user: UserEntity) => user.id !== entity.id);
    return new Promise((resolve, reject) => {
      resolve(entity);
    });
  }

  findById(
    id: string,
    repositoryManager: IBaseConnection
  ): Promise<UserEntity[]> {
    const result: UserEntity[] = this.db.filter(
      (user: UserEntity) => user.id === id
    );
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  find(
    entity: UserEntity,
    repositoryManager: IBaseConnection
  ): Promise<UserEntity[]> {
    const notNullAttributes: string[] = findNotNullAttributes(entity);
    // eslint-disable-next-line array-callback-return, consistent-return
    const result: UserEntity[] = this.db.filter((user: UserEntity) => {
      if (findMatchAttributes(notNullAttributes, entity, user)) {
        return user;
      }
    });

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  update(
    entity: UserEntity,
    repositoryManager: IBaseConnection
  ): Promise<UserEntity> {
    if (!entity.id) {
      throw new BaseError(REPOSITORY_ERRORS.ENTITY_ID_REQUIRED, 400);
    }
    let updateIndex: number = -1;
    this.db.forEach((user: UserEntity, index: number) => {
      if (user.id === entity.id) {
        updateIndex = index;
      }
    });
    this.db[updateIndex] = entity;
    return new Promise((resolve, reject) => {
      resolve(entity);
    });
  }
}
