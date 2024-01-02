const z = require("zod");

const newAnswerSchema = z.object({
  answer: z.string(),
  questionId: z.number().int().positive(),
  isRight: z.boolean(),
});

const updatedAnswerSchema = newAnswerSchema
  .omit({ questionId: true })
  .partial();

module.exports = {
  newAnswerSchema,
  updatedAnswerSchema,
};
