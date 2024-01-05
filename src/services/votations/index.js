const { AppDatasource } = require("../../data-source");
const { Votations } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class VotationsService {
  static async create(newVotation) {
    const createdVotation = await AppDatasource.createQueryBuilder()
      .insert()
      .into(Votations)
      .values(newVotation)
      .returning("*")
      .execute();

    return createdVotation.generatedMaps[0];
  }

  static async getVotationById(votationId) {
    const foundVotation = await AppDatasource.createQueryBuilder()
      .select("votations")
      .from(Votations, "votations")
      .where("votations.id = :votationId", { votationId })
      .getOne();

    if (!foundVotation) {
      throw new RecordNotFoundError(
        "No votation with the informed id was found"
      );
    }

    return foundVotation;
  }

  static async getVotationsByProject(projectId) {
    return AppDatasource.createQueryBuilder()
      .select("votations")
      .from(Votations, "votations")
      .innerJoin("votations.vacancy", "vacancy")
      .innerJoin("vacancy.project", "project")
      .where("project.id = :projectId", { projectId })
      .andWhere("votations.isOpen = true")
      .getMany();
  }

  static async update(votationId, updatedData) {
    const updatedVotation = await AppDatasource.createQueryBuilder()
      .update(Votations)
      .set(updatedData)
      .where("id = :votationId", { votationId })
      .returning("*")
      .execute();

    const wasVotationUpdated = updatedVotation.affected != 0;

    if (!wasVotationUpdated) {
      throw new RecordNotFoundError(
        "No votation with the informed id was found"
      );
    }

    return updatedVotation.raw[0];
  }

  static async delete(votationId) {
    const deletedVotation = await AppDatasource.createQueryBuilder()
      .delete()
      .from(Votations, "votations")
      .where("votations.id = :votationId", { votationId })
      .execute();

    const wasVotationDeleted = deletedVotation.affected != 0;

    if (!wasVotationDeleted) {
      throw new RecordNotFoundError(
        "No votation with the informed id was found"
      );
    }
  }
}

module.exports = { VotationsService };
