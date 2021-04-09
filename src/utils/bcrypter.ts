/* eslint-disable class-methods-use-this */
import * as bcrypt from 'bcrypt';

export class Encrypter {
  static async execute(data: string) {
    const salt = await bcrypt.genSalt(4);
    const encryptedData = await bcrypt.hash(data, salt);
    return encryptedData;
  }

  static async compare(data: string, encrypted: string) {
    const verify = await bcrypt.compare(data, encrypted);
    return verify;
  }
}
