const { skillLevels } = require("../../enumValues");
const { DuplicatedInfoError, InvalidParamValueError } = require("../../errors");
const {
  UserSkillsService,
  TechnologiesService,
  UsersService,
} = require("../../services");

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
      userId = request.loggedUser.id;
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

  static async isSkillLevelValid(request, response, nextMiddleware) {
    const { skillLevel: searchedSkillLevel } = request.params;
    const isSkillLevelValid = skillLevels.includes(searchedSkillLevel);

    if (!isSkillLevelValid) {
      throw new InvalidParamValueError(
        `Skill level not found, the values available are: ${skillLevels.join(
          ", "
        )}`
      );
    }

    return nextMiddleware();
  }

  static async doesTechnologyExists(request, response, nextMiddleware) {
    const { technologyId } = request.params;

    await TechnologiesService.getById(technologyId);

    return nextMiddleware();
  }

  static async doesUserExists(request, response, nextMiddleware) {
    const { userId } = request.params;

    await UsersService.getById(userId);

    return nextMiddleware();
  }
}

module.exports = { UserSkillsMiddlewares };
