const z = require("zod");

const newVacancySchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  learnersLimit: z.number().int(),
  projectId: z.number().int(),
  chosenCandidateId: z.number().int().optional(),
});

const updatedVacancySchema = newVacancySchema
  .omit({ projectId: true })
  .partial();

module.exports = { newVacancySchema, updatedVacancySchema };
