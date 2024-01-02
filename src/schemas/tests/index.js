const z = require("zod");

const newTestAnswers = z.array(
  z.object({
    questionId: z.number().int().positive(),
    answerId: z.number().int().positive(),
  })
);

module.exports = { newTestAnswers };
