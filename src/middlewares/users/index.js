const { DuplicatedInfoError } = require("../../errors/index");
const { InvalidTokenError } = require("../../errors/index");
const { UsersService } = require("../../services/index");
const { verify } = require("jsonwebtoken");

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

  static async isTokenFilled(request, response, nextMiddleware) {
    const token = request.headers?.authorization;

    if (!token) {
      throw new InvalidTokenError("Missing bearer token");
    }

    return nextMiddleware();
  }

  static async validateToken(request, response, nextMiddleware) {
    const token = String(request.headers.authorization);
    const tokenWithoutBearer = token.split(" ")[1];

    return verify(
      tokenWithoutBearer,
      process.env.SECRET_KEY,
      async (error, decodedToken) => {
        if (error || !decodedToken) {
          throw new InvalidTokenError(
            error?.message || "The token couldn't be decoded"
          );
        }

        const userFoundByEmail = await UsersService.getUserByEmail(
          decodedToken.email
        );

        request.loggedUser = userFoundByEmail;

        return nextMiddleware();
      }
    );
  }
}

module.exports = { UsersMiddlewares };
