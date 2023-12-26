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

  static async getAll(request, response) {
    const allUsers = await UsersService.getAll();
    return response.status(StatusCodes.OK).json(allUsers);
  }

  static async getById(request, response) {
    const id = request.params.id;
    const foundUser = await UsersService.getById(id);

    return response.status(StatusCodes.OK).json(foundUser);
  }

  static async getUsersBySearchedValue(request, response) {
    const foundUsers = await UsersService.getUsersBySearchedValue(
      request.params.value
    );

    return response.status(StatusCodes.OK).json(foundUsers);
  }

  static async update(request, response) {
    const id = request.params.id;
    const updatedUser = await UsersService.update(id, request.validatedData);

    return response.status(StatusCodes.OK).json(updatedUser);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await UsersService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { UsersController };
