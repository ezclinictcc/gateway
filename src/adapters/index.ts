import { IBaseConnection } from "../usecases/repository/interfaces/IBaseConnection";
import { TypeOrmAdapter } from "./repository/typeorm/TypeOrmAdapter";

let orm = null;

export function getRepositoryAdapter():IBaseConnection {
  if (!orm) {
    console.log("Creating new connection!");
    orm = new TypeOrmAdapter();
  } else {
    console.log("Using existent connection!");
  }
  return orm;
}
