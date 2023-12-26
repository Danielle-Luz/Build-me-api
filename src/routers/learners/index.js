const { Router } = require("express");
const { LearnersController } = require("../../controllers");

const learnersRouter = Router();

learnersRouter.post("/", LearnersController.create);

learnersRouter.get("/", LearnersController.getAll);
learnersRouter.get("/:id", LearnersController.getById);

learnersRouter.patch("/:id", LearnersController.update);

learnersRouter.delete("/:id", LearnersController.delete);

module.exports = { learnersRouter };
