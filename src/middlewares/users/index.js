const {
  DuplicatedInfoError,
  RecordNotFoundError,
} = require("../../errors/index");
const { InvalidTokenError } = require("../../errors/index");
const {
  UsersService,
  RolesService,
} = require("../../services/index");
const { verify } = require("jsonwebtoken");
const { UtilsMiddlewares } = require("../utils");

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

        if (!userFoundByEmail) {
          throw new RecordNotFoundError(
            "The email decoded from the token does not match any user's email"
          );
        }

        request.loggedUser = userFoundByEmail;

        return nextMiddleware();
      }
    );
  }

  static async isRoleIdValid(request, response, nextMiddleware) {
    const roleId = request.body.roleId;

    if (roleId || roleId === 0) {
      const foundRole = await RolesService.getById(roleId);

      if (!foundRole) {
        throw new RecordNotFoundError("No role with the informed id was found");
      }
    }

    return nextMiddleware();
  }

  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const modifiedUserId = request.params.id;
    return await UtilsMiddlewares.hasPermissionOnRoute(request, response, nextMiddleware, modifiedUserId);
  }
}

module.exports = { UsersMiddlewares };
