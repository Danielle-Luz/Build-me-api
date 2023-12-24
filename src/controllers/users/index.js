const { UsersService } = require("../../services/index");

class UsersController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdUser = await UsersService.create(validatedData);

    return response.status(201).json(createdUser);
  }

  static async login(request, response) {
    const { validatedData } = request;

    const token = await UsersService.login(validatedData);

    return response.status(200).json(token);
  }
}

module.exports = { UsersController };
