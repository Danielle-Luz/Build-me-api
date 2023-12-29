const { DuplicatedInfoError } = require("../../errors");
const { UserSkillsService } = require("../../services");

class UserSkillsMiddlewares {
  static async wasTechnologyAlreadyAdded(request, response, nextMiddleware) {
    const { technologyId } = request.validatedData;
    let userId;

    const isUpdatingUserSkill = request.method == "PATCH";

    if (isUpdatingUserSkill) {
      const userSkillId = request.params.id;
      const foundUserSkill = await UserSkillsService.getById(userSkillId);
      userId = foundUserSkill.userId;
    } else {
      userId = request.validatedData.userId;
    }

    const duplicatedUserSkill = await UserSkillsService.getTechnologyFromUser(
      technologyId,
      userId
    );

    if (duplicatedUserSkill) {
      throw new DuplicatedInfoError(
        "This technology was already related to this user"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { UserSkillsMiddlewares };
