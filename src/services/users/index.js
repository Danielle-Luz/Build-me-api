const { sign } = require("jsonwebtoken");
const { AppDatasource } = require("../../data-source");
const { Users } = require("../../entities/index");
const { UsersHelper } = require("../../helpers/index");
const { InvalidLoginInfoError } = require("../../errors/index");
const { RecordNotFoundError } = require("../../errors/index");

class UsersService {
  static async create(newUser) {
    const userWithEncryptedPassword = await UsersHelper.setEncryptedPassword(
      newUser
    );

    const createdUser = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Users)
      .values(userWithEncryptedPassword)
      .returning("*")
      .execute();

    return createdUser.generatedMaps[0];
  }

  static async login(loginInfo) {
    const isLonginInfoWrong = await UsersHelper.validateLoginInfo(loginInfo);

    if (isLonginInfoWrong) {
      throw new InvalidLoginInfoError();
    }

    const header = { email: loginInfo.email };
    const secretKey = process.env.SECRET_KEY;
    const signature = { expiresIn: "24h", subject: loginInfo.email };

    const token = sign(header, secretKey, signature);

    return { token };
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .innerJoinAndSelect("users.roleId", "role")
      .getMany();
  }

  static async getUserByEmail(email) {
    return AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .innerJoinAndSelect("users.roleId", "role")
      .where("users.email = :email", { email })
      .getOne();
  }

  static async getUserByUsername(username) {
    return AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.username = :username", { username })
      .getOne();
  }

  static async getById(id) {
    const foundUser = await AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.id = :id", { id })
      .getOne();

    if (!foundUser) {
      throw new RecordNotFoundError("No user found with the informed id");
    }

    return foundUser;
  }

  static async getUsersBySearchedValue(value) {
    const formattedValue = `%${value}%`;
    return AppDatasource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.username ilike :formattedValue", { formattedValue })
      .orWhere("users.firstName ilike :formattedValue", { formattedValue })
      .orWhere("users.lastName ilike :formattedValue", { formattedValue })
      .orWhere("users.email ilike :formattedValue", { formattedValue })
      .orWhere("users.github_username ilike :formattedValue", {
        formattedValue,
      })
      .getMany();
  }

  static async update(id, updatedData) {
    if (updatedData.password) {
      updatedData = await UsersHelper.setEncryptedPassword(updatedData);
    }

    const updatedUser = await AppDatasource.createQueryBuilder()
      .update(Users)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return updatedUser.raw[0];
  }

  static async delete(id) {
    const deletedUser = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Users, "users")
      .where("users.id = :id", { id })
      .execute();

    const wasUserDeleted = deletedUser.affected != 0;

    if (!wasUserDeleted) {
      throw new RecordNotFoundError("No user with the informed id was found");
    }
  }
}

module.exports = { UsersService };
