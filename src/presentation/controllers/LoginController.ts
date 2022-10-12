/* eslint-disable no-unreachable */
import { decode, sign } from "jsonwebtoken";
import { BcryptAdapter } from "../../adapters/presentation/bcrypt/BcryptAdapter";
import { UuidGeneratorAdapter } from "../../adapters/repository/uuid/UuidGeneratoryAdapter";
import { CredentialEntity } from "../../entities/credential/CredentialEntity";
import { LoginEntity } from "../../entities/login/LoginEntity";
import { IHashEncrypt } from "../../external/interfaces/IHashEncrypt";
import CommonRepository from "../../usecases/repository/common/CommonRepository";
import { IBaseConnection } from "../../usecases/repository/interfaces/IBaseConnection";
import CommonService from "../../usecases/service/common/CommonService";
import { IHttpRequest } from "../interfaces/http-request";
import { LogCriticality } from "../interfaces/log-criticality";
import { BaseController } from "./BaseController";

class LoginController extends BaseController<LoginEntity, IBaseConnection> {
  // private readonly logger: IAppLogger;

  private readonly tokenExpireTime: string = "1m";

  private readonly repositoryManager: IBaseConnection;

  private entityName: string = "login";

  public constructor(repositoryManager: IBaseConnection) {
    super();
    // this.logger = logger;
    this.repositoryManager = repositoryManager;
  }

  create = async ({ body, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter create login...");
    const tokenSecret = process.env.TOKEN_SECRET;
    const commonRepository = new CommonRepository<LoginEntity>(this.entityName);
    const service = new CommonService(commonRepository);
    const uuid = new UuidGeneratorAdapter();
    const encryptHash: IHashEncrypt = new BcryptAdapter();
    const credential: CredentialEntity = new CredentialEntity(
      null,
      body.email,
      null,
      null
    );

    let isValidPassword = false;
    const commonCredentialRepository = new CommonRepository<CredentialEntity>(
      "credential"
    );
    const serviceCredential = new CommonService(commonCredentialRepository);
    let user: any = null;
    await serviceCredential
      .find(credential, logger, this.repositoryManager)
      .then((userCredentials) => {
        if (userCredentials && userCredentials.length === 1) {
          user = new LoginEntity(null, null, null);
          user = userCredentials.pop();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("user", user);
    if (!user) {
      logger.showLog(LogCriticality.ERROR, "User not found!");
      throw new Error("login_not_found");
    }

    isValidPassword = await encryptHash.compareHash(
      body.password,
      user.password
    );

    const loginId = uuid.createId();

    if (isValidPassword) {
      const token = sign({ idUser: user.id }, tokenSecret, {
        subject: loginId,
        expiresIn: this.tokenExpireTime,
      });
      let id = null;

      const tokenDecode = decode(token);
      id = tokenDecode.sub;
      const expiredLogin: LoginEntity = new LoginEntity(id, null, null);
      await service
        .delete(expiredLogin, logger, this.repositoryManager)
        .then(() => {
          logger.showLog(LogCriticality.INFO, "Old session removed...");
        })
        .catch(() => {
          logger.showLog(LogCriticality.ERROR, "Error to remove old session");
        });

      const login: LoginEntity = new LoginEntity(loginId, token, null);
      const result: any = await service.create(
        login,
        logger,
        this.repositoryManager
      );
      logger.showLog(LogCriticality.INFO, "Exit create login...");
      return result;
    }
    logger.showLog(LogCriticality.ERROR, "Invalid credentials!");
    throw new Error("login_not_found");
  };

  update = async ({ body, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter update...");
    const commonRepository = new CommonRepository<LoginEntity>(this.entityName);
    const service = new CommonService(commonRepository);
    const login: LoginEntity = new LoginEntity(body.id, body.token, null);
    const result: any = await service.update(
      login,
      logger,
      this.repositoryManager
    );
    logger.showLog(LogCriticality.INFO, "Exit update...");
    return result;
  };

  find = async ({ param, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter find...");

    const commonRepository = new CommonRepository<LoginEntity>(this.entityName);
    const service = new CommonService(commonRepository);
    const login = new LoginEntity(param.id, param.token, null);

    const result: Promise<any> = service.find(
      login,
      logger,
      this.repositoryManager
    );

    logger.showLog(LogCriticality.INFO, "Exit find...");
    return result;
  };

  remove = async ({ token, logger }: IHttpRequest) => {
    logger.showLog(LogCriticality.INFO, "Enter logout...");

    let id = null;
    const tokenDecode = decode(token);
    id = tokenDecode.sub;

    const commonRepository = new CommonRepository<LoginEntity>(this.entityName);
    const service = new CommonService(commonRepository);
    const login = new LoginEntity(id, null, null);
    const result: any = await service.delete(
      login,
      logger,
      this.repositoryManager
    );
    logger.showLog(LogCriticality.INFO, "Exit logout...");
    return result;
  };
}

export default LoginController;
