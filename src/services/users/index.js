import { sign } from "jsonwebtoken";
import AppDatasource from "../../data-source";
import Users from "../../entities/users";
import { UsersHelper } from "../../helpers";

export default class UsersService {
  static async create(newUser) {
    const userWithEncryptedPassword = UsersHelper.setEncryptedPassword(newUser);

    const createdUser = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Users)
      .values(userWithEncryptedPassword)
      .returning("*")
      .execute();

    const { password, ...createdUserData } = createdUser.generatedMaps[0];

    return createdUserData;
  }

  static async login(loginInfo) {
    UsersHelper.validateLoginInfo(loginInfo);

    const header = { email: loginInfo.email };
    const secretKey = process.env.SECRET_KEY;
    const signature = { expiresIn: "24h", subject: loginInfo.email };

    const token = sign(header, secretKey, signature);

    return { token };
  }

  static async getUserByEmail(email) {
    const foundUser = AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.email = :email", { email })
      .getOne();

    return foundUser;
  }

  static async getUserByUsername(username) {
    const foundUser = AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.username = :username", { username })
      .getOne();

    return foundUser;
  }
}
