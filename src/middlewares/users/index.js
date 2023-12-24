const { DuplicatedInfoError } = require("../../errors/index");
const { InvalidTokenError } = require("../../errors/index");
const { UsersService } = require("../../services/index");

class UsersMiddlewares {
  static async isUsernameUnique(request, response, nextMiddleware) {
    const { validatedData } = request;
    const foundUser = await UsersService.getUserByUsername(
      validatedData.username
    );

    if (foundUser != undefined) {
      throw new DuplicatedInfoError(
        "An existent user already has this username"
      );
    }

    return nextMiddleware();
  }

  static async isEmailUnique(request, response, nextMiddleware) {
    const { validatedData } = request;
    const foundUser = await UsersService.getUserByEmail(validatedData.email);

    if (foundUser != undefined) {
      throw new DuplicatedInfoError("An existent user already has this email");
    }

    return nextMiddleware();
  }

  static async validateToken(request, response, nextMiddleware) {}
}

module.exports = { UsersMiddlewares };
