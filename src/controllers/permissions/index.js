const { PermissionsService } = require("../../services/index");
const { StatusCodes } = require("http-status-codes");

class PermissionsController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdPermission = await PermissionsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdPermission);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedPermission = await PermissionsController.update(
      validatedData,
      id
    );

    return response.status(StatusCodes.OK).json(updatedPermission);
  }
}

module.exports = { PermissionsController };
