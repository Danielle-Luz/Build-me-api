const { RolesService } = require("../../services/index");
const { StatusCodes } = require("http-status-codes");

class RolesController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdRole = await RolesService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdRole);
  }

  static async getAll(request, response) {
    const allRoles = await RolesService.getAll();
    return response.status(StatusCodes.OK).json(allRoles);
  }
}

module.exports = { RolesController };
