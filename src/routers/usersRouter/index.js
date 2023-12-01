import { Router } from "express";

const usersRouter = Router();

usersRouter.get("");
usersRouter.get("/:id");
usersRouter.post("/login");
usersRouter.post("/newUser");

export default usersRouter;
