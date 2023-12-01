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
}
