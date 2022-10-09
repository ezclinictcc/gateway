import { CommonEntity } from "../../../entities/common/CommonEntity";
import { IBaseConnection } from "../../repository/interfaces/IBaseConnection";
import { IAppLogger } from "./IAppLogger";

export interface ICommonService<
  T extends CommonEntity,
  L extends IAppLogger,
  R extends IBaseConnection
> {
  findById(id: string, logger: L, repositoryManager: R): Promise<T[]>;
  getRepository(): void;
  create(entity: T, logger: L, repositoryManager: R): Promise<T>;
  find(entity: T, logger: L, repositoryManager: R): Promise<T[]>;
  delete(entity: T, logger: L, repositoryManager: R): Promise<T>;
  update(entity: T, logger: L, repositoryManager: R): Promise<T>;
}
