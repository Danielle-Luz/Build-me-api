const { AppDatasource } = require("../../data-source");
const { Permissions } = require("../../entities/index");
const { RecordNotFoundError } = require("../../errors");

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

  static async getAll() {
    return await AppDatasource.createQueryBuilder()
      .select("permissions")
      .from(Permissions, "permissions")
      .getRawMany();
  }

  static async update(id, updatedData) {
    const updatedPermission = await AppDatasource.createQueryBuilder()
      .update(Permissions)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    if (updatedPermission.affected === 0) {
      throw new RecordNotFoundError(
        "No permission with the informed id was found"
      );
    }

    return updatedPermission.raw[0];
  }
}

module.exports = { PermissionsService };
