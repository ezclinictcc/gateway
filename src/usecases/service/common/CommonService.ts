import { CommonEntity } from "../../../entities/common/CommonEntity";
import { LogCriticality } from "../../../presentation/interfaces/logs";
import { IBaseConnection } from "../../repository/interfaces/IBaseConnection";
import { IRepository } from "../../repository/interfaces/IRepository";
import { IAppLogger } from "../interfaces/IAppLogger";
import { ICommonService } from "../interfaces/ICommonService";

class CommonService<
  T extends CommonEntity,
  L extends IAppLogger,
  R extends IBaseConnection
> implements ICommonService<T, L, R>
{
  private repository: IRepository<T>;

  constructor(repository: IRepository<T>) {
    this.repository = repository;
  }

  getRepository(): void {
    throw new Error("Method not implemented.");
  }

  async find(entity: T, logger: L, repositoryManager: R): Promise<T[]> {
    logger.showLog(LogCriticality.INFO, "Searching user on database...");
    return this.repository.find(entity, repositoryManager);
  }

  async delete(entity: T, logger: L, repositoryManager: R): Promise<T> {
    logger.showLog(LogCriticality.INFO, "Deleting user on database...");
    return this.repository.delete(entity, repositoryManager);
  }

  async update(entity: T, logger: L, repositoryManager: R): Promise<T> {
    logger.showLog(LogCriticality.INFO, "Updating user on database...");
    return this.repository.update(entity, repositoryManager);
  }

  async findById(id: string, logger: L, repositoryManager: R): Promise<T[]> {
    logger.showLog(LogCriticality.INFO, "Finding user by id on database...");
    const result = this.repository.findById(id, repositoryManager);
    return result;
  }

  async create(entity: T, logger: L, repositoryManager: R): Promise<T> {
    logger.showLog(LogCriticality.INFO, "Creating user on database...");
    const result: any = await this.repository.create(entity, repositoryManager);
    return result;
  }
}

export default CommonService;
