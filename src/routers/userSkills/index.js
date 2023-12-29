const { Router } = require("express");
const { UserSkillsController } = require("../../controllers");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
  UserSkillsMiddlewares,
} = require("../../middlewares");
const {
  newUserSkillsSchema,
  updatedUserSkillsSchema,
} = require("../../schemas/userSkills");

const userSkillsRouter = Router();

userSkillsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newUserSkillsSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsMiddlewares.wasTechnologyAlreadyAdded,
  UserSkillsController.create
);

userSkillsRouter.get("/users/:id", UserSkillsController.getUserSkillsByUserId);
userSkillsRouter.get(
  "/skills/:skillLevel",
  UserSkillsController.getBySkillLevel
);
userSkillsRouter.get("/:id", UserSkillsController.getById);

userSkillsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedUserSkillsSchema),
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
