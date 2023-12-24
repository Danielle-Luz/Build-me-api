const { AppDatasource } = require("../../data-source");
const { Users } = require("../../entities/index");
const { compare, hash } = require("bcryptjs");
const { InvalidTokenError } = require("../../errors/index");

class UsersHelper {
  static async setEncryptedPassword(newUser) {
    const encryptedPassword = await hash(newUser.password, 10);
    newUser.password = encryptedPassword;

    return newUser;
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

  static async handleTokenDecoding(error, decodedToken) {
    if(error) {
      throw new InvalidTokenError(error.message);
    }
  }
}

module.exports = { UsersHelper };
