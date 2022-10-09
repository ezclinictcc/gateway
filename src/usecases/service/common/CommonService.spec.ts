import { WinsonLoggerAdapter } from "../../../adapters/external/winson/WinsonAdapter";
import { DbMockAdapter } from "../../../adapters/repository/dbMocks/DbMockAdapter";
import { DbMockUser } from "../../../adapters/repository/dbMocks/users/userDbMock";
import { UserEntity } from "../../../entities/user/UserEntity";
import UserRepository from "../../repository/user/UserRepository";
import { IAppLogger } from "../interfaces/IAppLogger";
import CommonService from "./CommonService";

let userServiceInstance: CommonService<UserEntity, IAppLogger, DbMockAdapter> =
  null;
let userRepositoryInstance = null;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInstance = DbMockUser.getInstance();
    userServiceInstance = new CommonService(userRepositoryInstance);
  });

  it("should be able to create a new user ?", async () => {
    const user: UserEntity = {
      id: "1",
      email: "teste@teste.com.br",
      name: "teste",
      password: "123456",
      cep: "13040-722",
      country: "Brasil",
      state: "São Paulo",
      city: "Campinas",
      distric: "Bairro X, Rua Y",
      number: 123,
      createdAt: new Date(),
      dbSchema: {},
    };
    const logger = new WinsonLoggerAdapter();
    logger.showLog("info", "teste");
    userServiceInstance.create(user, logger, new DbMockAdapter());

    const userCreated: any = await userServiceInstance.findById(
      "1",
      logger,
      new DbMockAdapter()
    );

    expect(userCreated.length).toBeGreaterThan(0);
  });
});
