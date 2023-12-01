import { Router } from "express";
import { UsersService } from "../../services";

const usersRouter = Router();

usersRouter.get("");
usersRouter.get("/:id");
usersRouter.post("/login");
usersRouter.post("/newUser", UsersService.create);

export default usersRouter;
