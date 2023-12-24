const { AppDatasource } = require("../../data-source");
const { Users } = require("../../entities/index");
const { compare, hash } = require("bcryptjs");

class UsersHelper {
  static async setEncryptedPassword(user) {
    const encryptedPassword = await hash(user.password, 10);
    user.password = encryptedPassword;

    return user;
  }

  static async validateLoginInfo(loginInfo) {
    const foundUser = await AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.email = :email", { email: loginInfo.email })
      .getOne();

    const isPasswordRight = await compare(
      loginInfo.password,
      foundUser?.password || ""
    );

    return !isPasswordRight || !foundUser;
  }
}

module.exports = { UsersHelper };
