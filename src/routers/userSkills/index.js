const { Router } = require("express");
const { UserSkillsController } = require("../../controllers");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
  UserSkillsMiddlewares,
} = require("../../middlewares");
const { userSkillsSchema } = require("../../schemas/userSkills");

const userSkillsRouter = Router();

userSkillsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(userSkillsSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsMiddlewares.wasTechnologyAlreadyAdded,
  UserSkillsController.create
);

userSkillsRouter.get(
  "/users/:userId",
  UserSkillsMiddlewares.doesUserExists,
  UserSkillsController.getUserSkillsByUserId
);
userSkillsRouter.get(
  "/skillLevel/:skillLevel",
  UserSkillsMiddlewares.isSkillLevelValid,
  UserSkillsController.getBySkillLevel
);
userSkillsRouter.get(
  "/technologies/:technologyId",
  UserSkillsMiddlewares.doesTechnologyExists,
  UserSkillsController.getByTechnologyId
);
userSkillsRouter.get("/:id", UserSkillsController.getById);

userSkillsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(userSkillsSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.wasNoFieldUpdated,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsMiddlewares.wasTechnologyAlreadyAdded,
  UserSkillsController.update
);

userSkillsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsController.delete
);

module.exports = { userSkillsRouter };
