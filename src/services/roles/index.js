const { AppDatasource } = require("../../data-source");
const { Roles } = require("../../entities/index");

class RolesService {
  async create(newRole) {
    const createdRole = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Roles)
      .values(newRole)
      .returning("*")
      .execute();

    return createdRole.generatedMaps[0];
  }
}

module.exports = { RolesService };
