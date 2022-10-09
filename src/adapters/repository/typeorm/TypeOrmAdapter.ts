import { DataSource } from "typeorm";
import { IBaseConnection } from "../../../usecases/repository/interfaces/IBaseConnection";
import AppDataSource from "./data-source";

export class TypeOrmAdapter implements IBaseConnection {
  private connection:DataSource;

  async createConnection(): Promise<any> {
    console.log("Trying to connect Database...");

    await AppDataSource.initialize()
      .then((datasource:DataSource) => {
        this.connection = datasource;
        this.runMigrations();
      })
      .catch((error) => console.log(error));
  }

  obtainConnection():any {
    console.log("obtain conection!!!!!!");
    return this.connection;
  }

  async runMigrations(): Promise<any> {
    console.log("Trying to run migrations...", AppDataSource.migrations);
    await AppDataSource.runMigrations()
      .then(() => console.log("Migrations executed with success!"))
      .catch((error) => console.log(error));
  }
}
