const { AppDatasource } = require("../../data-source");
const { Permissions } = require("../../entities/index");

class PermissionsService {
  static async create(newPermission) {
    const createdPermission = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Permissions)
      .values(newPermission)
      .returning("*")
      .execute();

    return createdPermission.generatedMaps[0];
  }
}

module.exports = { PermissionsService };
