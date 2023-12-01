import { hash } from "bcryptjs";

export default class UsersHelper {
  static async setEncryptedPassword(newUser) {
    const encryptedPassword = await hash(newUser.password, 10);
    newUser.password = encryptedPassword;

    return newUser;
  }
}
