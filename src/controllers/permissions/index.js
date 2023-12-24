const { PermissionsService } = require("../../services/index");
const { StatusCodes } = require("http-status-codes");

class PermissionsController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdPermission = await PermissionsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdPermission);
  }
}

module.exports = { PermissionsController };
