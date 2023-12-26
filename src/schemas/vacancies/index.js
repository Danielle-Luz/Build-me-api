const z = require("zod");

const newVacancySchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  learnersLimit: z.number().int(),
  projectId: z.number().int(),
  chosenCandidateId: z.number().int(),
});

const updatedVacancySchema = newVacancySchema.partial();

module.exports = { newVacancySchema, updatedVacancySchema };
