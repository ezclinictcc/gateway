export interface IHashEncrypt {
  createHash: (blankString: string, salt: number) => Promise<string>;
  compareHash(blankString: string, hashString: string): Promise<boolean>;
}
