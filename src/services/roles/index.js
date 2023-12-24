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
    return await AppDatasource.createQueryBuilder()
      .select("roles")
      .from(Roles, "roles")
      .getRawMany();
  }
}

module.exports = { RolesService };
