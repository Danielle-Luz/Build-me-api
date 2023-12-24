const { AppDatasource } = require("../../data-source");
const { Resources } = require("../../entities/index");

class ResourcesService {
  static async create(newResource) {
    const createdResource = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Resources)
      .values(newResource)
      .returning("*")
      .execute();

    return createdResource.generatedMaps[0];
  }
}

module.exports = { ResourcesService };
