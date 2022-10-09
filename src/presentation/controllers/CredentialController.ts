/* eslint-disable no-unreachable */
import { BcryptAdapter } from "../../adapters/presentation/bcrypt/BcryptAdapter";
import { UuidGeneratorAdapter } from "../../adapters/repository/uuid/UuidGeneratoryAdapter";
import { CredentialEntity } from "../../entities/credential/CredentialEntity";
import { IHashEncrypt } from "../../external/interfaces/IHashEncrypt";
import CommonRepository from "../../usecases/repository/common/CommonRepository";
import { IBaseConnection } from "../../usecases/repository/interfaces/IBaseConnection";
import CommonService from "../../usecases/service/common/CommonService";
import { IHttpRequest } from "../interfaces/http-request";
import { LogCriticality } from "../interfaces/logs";
import { BaseController } from "./BaseController";

class CredentialController extends BaseController<
  CredentialEntity,
  IBaseConnection
> {
  // private readonly logger: IAppLogger;

  private readonly repositoryManager: IBaseConnection;

  private entityName: string = "credential";

  public constructor(repositoryManager: IBaseConnection) {
    super();
    // this.logger = logger;
    this.repositoryManager = repositoryManager;
  }

  create = async ({ body, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter create...");
    const commonRepository = new CommonRepository<CredentialEntity>(
      this.entityName
    );
    const service = new CommonService(commonRepository);
    const uuid = new UuidGeneratorAdapter();

    const encryptHash: IHashEncrypt = new BcryptAdapter();
    const passwordHash = await encryptHash.createHash(body.password, 8);

    const credential: CredentialEntity = new CredentialEntity(
      uuid.createId(),
      body.login,
      passwordHash,
      null
    );
    const result: any = await service.create(
      credential,
      logger,
      this.repositoryManager
    );
    logger.showLog(LogCriticality.INFO, "Exit create...");
    return result;
  };

  update = async ({ body, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter update...");
    const commonRepository = new CommonRepository<CredentialEntity>(
      this.entityName
    );
    const service = new CommonService(commonRepository);
    const credential: CredentialEntity = new CredentialEntity(
      body.id,
      body.login,
      body.password,
      null
    );
    const result: any = await service.update(
      credential,
      logger,
      this.repositoryManager
    );
    logger.showLog(LogCriticality.INFO, "Exit update...");
    return result;
  };

  find = async ({ param, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter find...");

    const commonRepository = new CommonRepository<CredentialEntity>(
      this.entityName
    );
    const service = new CommonService(commonRepository);
    const credential = new CredentialEntity(param.id, param.login, null, null);

    const result: Promise<any> = service.find(
      credential,
      logger,
      this.repositoryManager
    );

    logger.showLog(LogCriticality.INFO, "Exit find...");
    return result;
  };

  remove = async ({ param, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter delete...");
    const commonRepository = new CommonRepository<CredentialEntity>(
      this.entityName
    );
    const service = new CommonService(commonRepository);
    const credential = new CredentialEntity(param.id, null, null, null);
    const result: any = await service.delete(
      credential,
      logger,
      this.repositoryManager
    );
    logger.showLog(LogCriticality.INFO, "Exit delete...");
    return result;
  };
}

export default CredentialController;
