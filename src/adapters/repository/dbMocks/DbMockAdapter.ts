import { DataSource } from "typeorm";
import { IBaseConnection } from "../../../usecases/repository/interfaces/IBaseConnection";
// import AppDataSource from "./data-source";

const DataSourceMock: any = {
  obtainConnection: () => QueryRunner,
};

const QueryRunner: any = {
  createQueryRunner: () => {},
};

export class DbMockAdapter implements IBaseConnection {
  // private connection: DataSource;

  async createConnection(): Promise<any> {
    console.log("Trying to connect Database...");

    await new Promise((resolve, reject) => {
      resolve("DbMock Connected!");
    });
  }

  obtainConnection(): any {
    console.log("obtain conection!!!!!!");
    return DataSourceMock;
  }

  async runMigrations(): Promise<any> {
    return {};
  }
}
