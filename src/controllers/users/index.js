const { UsersService } = require("../../services/index");
const { StatusCodes } = require("http-status-codes");

class UsersController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdUser = await UsersService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdUser);
  }

  static async login(request, response) {
    const { validatedData } = request;

    const token = await UsersService.login(validatedData);

    return response.status(StatusCodes.OK).json(token);
  }

  static async getUserById(request, response) {
    const id = request.params?.id;
    const foundUser = await UsersService.getUserById(id);

    return response.status(StatusCodes.OK).json(foundUser);
  }
}

module.exports = { UsersController };
