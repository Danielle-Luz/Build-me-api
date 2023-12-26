const { AppDatasource } = require("../../data-source");
const { Resources } = require("../../entities/index");
const { Roles } = require("../../entities/index");
const { RecordNotFoundError } = require("../../errors");
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

  static async getAll() {
    const allPermissions = await AppDatasource.createQueryBuilder()
      .select("permissions")
      .from(Permissions)
      .innerJoinAndSelect("permissions.roleId", "role")
      .innerJoinAndSelect("permissions.resourceId", "resource")
      .getMany();

    return allPermissions.map((permission) => {
      const { resourceId, roleId, ...otherColumns } = permission;
      return { ...otherColumns, resource: resourceId, role: roleId };
    });
  }

  static async getPermissionsByRoleId(roleId) {}

  static async getPermissionsByFilters(resourceName, roleId) {
    return AppDatasource.createQueryBuilder()
      .select("permissions")
      .from(Permissions, "permissions")
      .innerJoin("permissions.resourceId", "resource")
      .where("resource.name = :resourceName", { resourceName })
      .andWhere("permissions.roleId = :roleId", { roleId })
      .getOne();
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
