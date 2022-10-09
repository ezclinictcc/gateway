import { v4 as uuidV4 } from "uuid";
import { IIdGenerator } from "../../../usecases/repository/interfaces/IIdGenerator";

export class UuidGeneratorAdapter implements IIdGenerator {
  createId(): string {
    return uuidV4();
  }
}
