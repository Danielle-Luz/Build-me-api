const { AppDatasource } = require("../../data-source");
const { Roles } = require("../../entities/index");

class RolesService {
  static async create(newRole) {
    const createdRole = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Roles)
      .values(newRole)
      .returning("*")
      .execute();

    return createdRole.generatedMaps[0];
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("roles")
      .from(Roles, "roles")
      .getMany();
  }

  static async getById(id) {
    const foundRole = await AppDatasource.createQueryBuilder()
      .select("roles")
      .from(Roles, "roles")
      .where("roles.id = :id", { id })
      .getOne();

    return foundRole;
  }

  static async getByName(name) {
    return AppDatasource.createQueryBuilder()
      .select("roles")
      .from(Roles, "roles")
      .where("roles.name = :name", { name })
      .getOne();
  }
}

module.exports = { RolesService };
