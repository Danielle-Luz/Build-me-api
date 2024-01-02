const { Router } = require("express");
const { UserSkillsController } = require("../../controllers");
const { UserSkillsMiddlewares } = require("../../middlewares");

const userSkillsRouter = Router();

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

module.exports = { userSkillsRouter };
