const z = require("zod");

const newQuestionSchema = z.object({
  question: z.string(),
  technologyId: z.number().int().positive(),
  rightAnswerId: z.number().int().positive(),
  difficultyLevel: z.number().int().min(1).max(3),
});

const updatedQuestionSchema = newQuestionSchema.partial();

module.exports = {
  newQuestionSchema,
  updatedQuestionSchema,
};
