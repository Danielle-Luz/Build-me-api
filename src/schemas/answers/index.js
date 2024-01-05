const z = require("zod");
const {
  QuestionsMiddlewares,
  AnswersMiddlewares,
} = require("../../middlewares");

const answerSchema = z.object({
  answer: z.string(),
  questionId: z.number().int().positive(),
  isRight: z.boolean(),
});

const newAnswerSchema = z.array(
  z
    .object({
      answer: z.string(),
      questionId: z.number().int().positive(),
      isRight: z.boolean(),
    })
    .refine(QuestionsMiddlewares.validateQuestionId, {
      message: "No question with the informed id was found",
    })
    .refine(AnswersMiddlewares.doesVariousQuestionsAlreadyHaveRightAnswer, {
      message: "This question already has a right answer",
    })
);

const updatedAnswerSchema = answerSchema.omit({ questionId: true }).partial();

module.exports = {
  newAnswerSchema,
  updatedAnswerSchema,
};
