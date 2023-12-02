import { compare, hash } from "bcryptjs";
import AppDatasource from "../../data-source";
import { users } from "../../entities";
import { InvalidLoginInfo } from "../../errors";

export default class UsersHelper {
  static async setEncryptedPassword(newUser) {
    const encryptedPassword = await hash(newUser.password, 10);
    newUser.password = encryptedPassword;

    return newUser;
  }

  static async validateLoginInfo(loginInfo) {
    const foundUser = await AppDatasource.createQueryBuilder()
      .select("users")
      .from(users, "users")
      .where("users.email = :email", { email: loginInfo.email })
      .getOne();

    const isPasswordRight = await compare(
      loginInfo.password,
      foundUser?.password
    );

    if (!isPasswordRight || !foundUser) throw new InvalidLoginInfo();

    return isPasswordRight;
  }
}
