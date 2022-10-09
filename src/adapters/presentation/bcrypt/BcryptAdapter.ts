import { hash, compare } from "bcryptjs";
import { IHashEncrypt } from "../../../external/interfaces/IHashEncrypt";

export class BcryptAdapter implements IHashEncrypt {
  async createHash(blankString: string, salt: number): Promise<string> {
    const stringHash: string = await hash(blankString, salt);
    return stringHash;
  }

  async compareHash(blankString: string, hashString: string): Promise<boolean> {
    const isEquals: boolean = await compare(blankString, hashString);
    return isEquals;
  }
}
