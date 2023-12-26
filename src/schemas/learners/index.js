const { z } = require("zod");

const newLearnerSchema = z.object({
  vacancyId: z.number().int().positive(),
  candidateId: z.number().int().positive(),
});

const updatedLearnerSchema = newLearnerSchema.partial();

module.exports = { newLearnerSchema, updatedLearnerSchema };
