const { StatusCodes } = require("http-status-codes");
const { UserSkillsService } = require("../../services");

class UserSkillsController {
  static async create(request, response) {
    const { validatedData } = request;
    const loggedUserId = request.loggedUser.id;

    validatedData.userId = loggedUserId;

    const createdUserSkill = await UserSkillsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdUserSkill);
  }

  static async getUserSkillsByUserId(request, response) {
    const userId = request.params.userId;

    const userSkills = await UserSkillsService.getUserSkillsByUserId(userId);

    return response.status(StatusCodes.OK).json(userSkills);
  }

  static async getById(request, response) {
    const id = request.params.id;

    const foundUserSkill = await UserSkillsService.getById(id);

    return response.status(StatusCodes.OK).json(foundUserSkill);
  }

  static async getBySkillLevel(request, response) {
    const skillLevel = request.params.skillLevel;

    const foundUserSkills = await UserSkillsService.getBySkillLevel(skillLevel);

    return response.status(StatusCodes.OK).json(foundUserSkills);
  }

  static async getByTechnologyId(request, response) {
    const technologyId = request.params.technologyId;

    const foundUserSkills = await UserSkillsService.getByTechnologyId(
      technologyId
    );

    return response.status(StatusCodes.OK).json(foundUserSkills);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedUserSkill = await UserSkillsService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedUserSkill);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await UserSkillsService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { UserSkillsController };
