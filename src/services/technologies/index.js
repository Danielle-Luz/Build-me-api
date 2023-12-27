const { AppDatasource } = require("../../data-source");
const { Technologies } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class TechnologiesService {
  static async create(newTechnology) {
    const createdTechnology = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Technologies)
      .values(newTechnology)
      .returning("*")
      .execute();

    return createdTechnology.generatedMaps[0];
  }

  static async getAll() {
    return AppDatasource.createQueryBuilder()
      .select("technologies")
      .from(Technologies, "technologies")
      .orderBy("technologies.name")
      .getMany();
  }

  static async getById(id) {
    const foundTechnology = await AppDatasource.createQueryBuilder()
      .select("technologies")
      .from(Technologies, "technologies")
      .where("technologies.id = :id", { id })
      .getOne();

    if (!foundTechnology) {
      throw new RecordNotFoundError(
        "No technology with the informed id was found"
      );
    }

    return foundTechnology;
  }

  static async getByName(name) {
    const foundTechnology = await AppDatasource.createQueryBuilder()
      .select("technologies")
      .from(Technologies, "technologies")
      .where("technologies.name = :name", { name })
      .getOne();

    return foundTechnology;
  }

  static async update(id, updatedData) {
    const updatedTechnology = await AppDatasource.createQueryBuilder()
      .update(Technologies)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasTechnologyUpdated = updatedTechnology.affected != 0;

    if (!wasTechnologyUpdated) {
      throw new RecordNotFoundError(
        "No technology with the informed id was found"
      );
    }

    return updatedTechnology.raw[0];
  }

  static async delete(id) {
    const deletedTechnology = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Technologies, "technologies")
      .where("technologies.id = :id", { id })
      .execute();

    const wasTechnologyDeleted = deletedTechnology.affected != 0;

    if (!wasTechnologyDeleted) {
      throw new RecordNotFoundError(
        "No technology with the informed id was found"
      );
    }
  }
}

module.exports = { TechnologiesService };
