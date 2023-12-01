import { compare, hash } from "bcryptjs";
import AppDatasource from "../../data-source";
import { users } from "../../entities";

export default class UsersHelper {
  static async setEncryptedPassword(newUser) {
    const encryptedPassword = await hash(newUser.password, 10);
    newUser.password = encryptedPassword;

    return newUser;
  }

  static async isPasswordRight(loggingUser) {
    const foundUser = await AppDatasource.createQueryBuilder()
      .select("users")
      .from(users, "users")
      .where("users.email = :email", { email: loggingUser.email })
      .getOne();

    const isPasswordRight = await compare(
      loggingUser.password,
      foundUser.password
    );

    return isPasswordRight;
  }
}
