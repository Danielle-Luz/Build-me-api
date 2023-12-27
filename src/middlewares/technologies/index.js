const { DuplicatedInfoError } = require("../../errors");
const { TechnologiesService } = require("../../services");

class TechnologiesMiddlewares {
  static async hasUniqueName(request, response, nextMiddleware) {
    const technologyName = request.validatedData.name;

    const foundTechnology = await TechnologiesService.getByName(technologyName);

    if (foundTechnology) {
      throw new DuplicatedInfoError(
        "A technology with this name was already created"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { TechnologiesMiddlewares };
