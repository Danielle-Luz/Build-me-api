import { DuplicatedInfo } from "../../errors";
import { UsersService } from "../../services";

export default class UsersMiddlewares {
  static async isUsernameUnique(request, response, nextMiddleware) {
    const { validatedData } = request;
    const foundUser = await UsersService.getUserByUsername(
      validatedData.username
    );

    if (foundUser != undefined) {
      throw new DuplicatedInfo("An existent user already has this username");
    }

    return nextMiddleware();
  }

  static async isEmailUnique(request, response, nextMiddleware) {
    const { validatedData } = request;
    const foundUser = await UsersService.getUserByEmail(validatedData.email);

    if (foundUser != undefined) {
      throw new DuplicatedInfo("An existent user already has this email");
    }

    return nextMiddleware();
  }
}
