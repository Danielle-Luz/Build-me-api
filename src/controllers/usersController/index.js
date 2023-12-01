import { UsersService } from "../../services";

export default class usersController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdUser = await UsersService.create(validatedData);

    return response.status(201).json(createdUser);
  }
}
