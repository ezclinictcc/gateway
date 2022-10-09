import { WinsonLoggerAdapter } from "../../adapters/external/winson/WinsonAdapter";
import { DbMockAdapter } from "../../adapters/repository/dbMocks/DbMockAdapter";
import { DbMockUser } from "../../adapters/repository/dbMocks/users/userDbMock";
import { UserEntity } from "../../entities/user/UserEntity";
import CommonService from "./common/CommonService";
import { IAppLogger } from "./interfaces/IAppLogger";

let userServiceInstance: CommonService<UserEntity, IAppLogger, DbMockAdapter> =
  null;
let userRepositoryInstance: DbMockUser = null;

describe("User Service", () => {
  beforeAll(() => {
    userRepositoryInstance = new DbMockUser();
    userServiceInstance = new CommonService(userRepositoryInstance);
  });
  const userCreate: UserEntity = {
    id: "1",
    email: "teste@teste.com.br",
    name: "teste",
    password: "123456",
    cep: "13040-722",
    country: "Brasil",
    state: "São Paulo",
    city: "Campinas",
    district: "Bairro X, Rua Y",
    number: 123,
    createdAt: new Date(),
    dbSchema: {},
    idProfile: "1",
    idUserType: "1",
  };

  const userUpdate: UserEntity = {
    id: "1",
    email: "_teste@teste.com.br",
    name: "teste",
    password: "_1234567",
    cep: "_13040-725",
    country: "_Brazil",
    state: "_São Paulo",
    city: "_Campinas",
    distric: "_Bairro X, Rua Y",
    number: 1234,
    createdAt: new Date(),
    dbSchema: {},
  };

  it("should be able to create a new user ?", async () => {
    const logger = new WinsonLoggerAdapter();
    userServiceInstance.create(userCreate, logger, new DbMockAdapter());

    const userCreated: any = await userServiceInstance.findById(
      "1",
      logger,
      new DbMockAdapter()
    );

    expect(userCreated.length).toBeGreaterThan(0);
  });

  it("should be able to find user created ?", async () => {
    const logger = new WinsonLoggerAdapter();

    const userFind: any = await userServiceInstance.find(
      {
        id: userCreate.id,
        email: null,
        name: null,
        password: null,
        cep: null,
        country: null,
        state: null,
        city: null,
        district: null,
        number: null,
        createdAt: null,
        dbSchema: null,
        idProfile: null,
        idUserType: null,
      },
      logger,
      new DbMockAdapter()
    );
    expect(userFind.length).toBeGreaterThan(0);
    expect(userFind[0].email).toEqual(userCreate.email);
    expect(userFind[0].name).toEqual(userCreate.name);
    expect(userFind[0].password).toEqual(userCreate.password);
    expect(userFind[0].cep).toEqual(userCreate.cep);
    expect(userFind[0].country).toEqual(userCreate.country);
    expect(userFind[0].state).toEqual(userCreate.state);
    expect(userFind[0].city).toEqual(userCreate.city);
    expect(userFind[0].distric).toEqual(userCreate.district);
    expect(userFind[0].number).toEqual(userCreate.number);
  });

  it("should be able to update a user ?", async () => {
    const logger = new WinsonLoggerAdapter();
    userServiceInstance.update(userUpdate, logger, new DbMockAdapter());
  });

  it("should be able to find user updated ?", async () => {
    const logger = new WinsonLoggerAdapter();

    const userFind: any = await userServiceInstance.find(
      {
        id: userUpdate.id,
        email: null,
        name: null,
        password: null,
        cep: null,
        country: null,
        state: null,
        city: null,
        district: null,
        number: null,
        createdAt: null,
        dbSchema: null,
        idProfile: null,
        idUserType: null,
      },
      logger,
      new DbMockAdapter()
    );

    expect(userFind.length).toBeGreaterThan(0);
    expect(userFind[0].email).toEqual(userUpdate.email);
    expect(userFind[0].name).toEqual(userUpdate.name);
    expect(userFind[0].password).toEqual(userUpdate.password);
    expect(userFind[0].cep).toEqual(userUpdate.cep);
    expect(userFind[0].country).toEqual(userUpdate.country);
    expect(userFind[0].state).toEqual(userUpdate.state);
    expect(userFind[0].city).toEqual(userUpdate.city);
    expect(userFind[0].distric).toEqual(userUpdate.district);
    expect(userFind[0].number).toEqual(userUpdate.number);
  });

  it("should be able to delete user ?", async () => {
    const logger = new WinsonLoggerAdapter();
    const dbSize = userRepositoryInstance.db.length;
    userServiceInstance.delete(userUpdate, logger, new DbMockAdapter());

    expect(userRepositoryInstance.db.length).toEqual(dbSize - 1);
  });
});
