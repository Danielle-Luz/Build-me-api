const { AppDatasource } = require("../../data-source");
const { UserSkills } = require("../../entities");
const { RecordNotFoundError } = require("../../errors");

class UserSkillsService {
  static async create(newUserSkill) {
    const createdUserSkill = await AppDatasource.createQueryBuilder()
      .insert()
      .into(UserSkills)
      .values(newUserSkill)
      .returning("*")
      .execute();

    return createdUserSkill.generatedMaps[0];
  }

  static async getUserSkillsByUserId(userId) {
    return AppDatasource.createQueryBuilder()
      .select("userSkills")
      .from(UserSkills, "userSkills")
      .where("userSkills.userId = :userId", { userId })
      .orderBy("userSkills.score", "DESC")
      .getMany();
  }

  static async getById(id) {
    try {
      return AppDatasource.createQueryBuilder()
        .select("userSkills")
        .from(UserSkills, "userSkills")
        .where("userSkills.id = :id", { id })
        .getOneOrFail();
    } catch {
      throw new RecordNotFoundError(
        "No user skill with the informed id was found"
      );
    }
  }

  static async getBySkillLevel(skillLevel) {
    return AppDatasource.createQueryBuilder()
      .select("userSkills")
      .from(UserSkills, "userSkills")
      .innerJoinAndSelect("userSkills.userId", "user")
      .where("userSkills.skillLevel = :skillLevel", { skillLevel })
      .orderBy("userSkills.score", "DESC")
      .getMany();
  }

  static async getTechnologyFromUser(technologyId, userId) {
    return AppDatasource.createQueryBuilder()
      .select("userSkills")
      .from(UserSkills, "userSkills")
      .where("userSkills.technologyId = :technologyId", { technologyId })
      .where("userSkills.userId = :userId", { userId })
      .getOne();
  }

  static async getByTechnologyId(technologyId) {
    return AppDatasource.createQueryBuilder()
      .select("userSkills")
      .from(UserSkills, "userSkills")
      .innerJoinAndSelect("userSkills.userId", "user")
      .where("userSkills.technologyId = :technologyId", { technologyId })
      .orderBy("userSkills.score", "DESC")
      .getMany();
  }

  static async update(id, updatedData) {
    const updatedUserSkill = await AppDatasource.createQueryBuilder()
      .update(UserSkills)
      .set(updatedData)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const wasUserSkillUpdated = updatedUserSkill.affected !== 0;

    if (!wasUserSkillUpdated) {
      throw new RecordNotFoundError(
        "No user skill with the informed id was found"
      );
    }

    return updatedUserSkill.raw[0];
  }

  static async delete(id) {
    const deletedUserSkill = await AppDatasource.createQueryBuilder()
      .delete()
      .from(UserSkills, "userSkills")
      .where("userSkills.id = :id", { id })
      .execute();

    const wasUserSkillDeleted = deletedUserSkill.affected !== 0;

    if (!wasUserSkillDeleted) {
      throw new RecordNotFoundError(
        "No user skill with the informed id was found"
      );
    }
  }
}

module.exports = { UserSkillsService };
