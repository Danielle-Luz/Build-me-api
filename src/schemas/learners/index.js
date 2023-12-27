const { z } = require("zod");

const newLearnerSchema = z.object({
  vacancyId: z.number().int().positive(),
});

module.exports = { newLearnerSchema };
