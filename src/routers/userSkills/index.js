const { Router } = require("express");
const { UserSkillsController } = require("../../controllers");
const { UsersMiddlewares, UtilsMiddlewares } = require("../../middlewares");

const userSkillsRouter = Router();

userSkillsRouter.post(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsController.create
);

userSkillsRouter.get("/users/:id", UserSkillsController.getUserSkillsByUserId);
userSkillsRouter.get("/skills/:skillLevel", UserSkillsController.getBySkillLevel);
userSkillsRouter.get("/:id", UserSkillsController.getById);

userSkillsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.hasPermissionOnRoute,
  UserSkillsController.delete
);

module.exports = { userSkillsRouter };
