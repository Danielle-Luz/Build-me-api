import { Router } from "express";
import { UsersController } from "../../controllers";

const usersRouter = Router();

usersRouter.get("");
usersRouter.get("/:id");
usersRouter.post("/login", UsersController.login);
usersRouter.post("/newUser", UsersController.create);

export default usersRouter;
