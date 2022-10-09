import { UserEntity } from "../../entities/user/UserEntity";
import { IBaseConnection } from "../repository/interfaces/IBaseConnection";
import { IRepository } from "../repository/interfaces/IRepository";
import { IAppLogger } from "./interfaces/IAppLogger";

class UserService {
  private repository: IRepository<UserEntity>;

  constructor(repository: IRepository<UserEntity>) {
    this.repository = repository;
  }

  async findById(id: string, logger: IAppLogger, repositoryManager:IBaseConnection): Promise<UserEntity[]> {
    logger.showLog("info", "Finding user by id on database...");
    const result = this.repository.findById(id, repositoryManager);
    return result;
  }

  async create(user: UserEntity, logger: IAppLogger, repositoryManager:IBaseConnection): Promise<UserEntity> {
    logger.showLog("info", "Creating user on database...");
    return this.repository.create(user, repositoryManager);
  }

  async update(user: UserEntity, logger: IAppLogger, repositoryManager:IBaseConnection): Promise<UserEntity> {
    logger.showLog("info", "Updating user on database...");
    return this.repository.update(user, repositoryManager);
  }

  async find(user: UserEntity, logger: IAppLogger, repositoryManager:IBaseConnection): Promise<UserEntity[]> {
    logger.showLog("info", "Searching user on database...");
    return this.repository.find(user, repositoryManager);
  }

  async delete(user: UserEntity, logger: IAppLogger, repositoryManager:IBaseConnection): Promise<UserEntity> {
    logger.showLog("info", "Deleting user on database...");
    return this.repository.delete(user, repositoryManager);
  }
}

export default UserService;
