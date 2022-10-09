import { IBaseConnection } from "./IBaseConnection";

export interface IRepository<T> {
  findById(id: string, repositoryManager: IBaseConnection): Promise<T[]>;
  getRepository(): void;
  create(entity: T, repositoryManager: IBaseConnection): Promise<T>;
  find(entity: T, repositoryManager: IBaseConnection): Promise<T[]>;
  delete(entity: T, repositoryManager: IBaseConnection): Promise<T>;
  update(entity: T, repositoryManager: IBaseConnection): Promise<T>;
}
