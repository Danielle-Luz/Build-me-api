const z = require("zod");

const newVacancySchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  learnersLimit: z.number().int(),
  projectId: z.number().int(),
  chosenCandidateId: z.union([z.number().int().optional(), z.null()]),
});

const updatedVacancySchema = newVacancySchema
  .omit({ projectId: true, chosenCandidateId: true })
  .partial();

module.exports = { newVacancySchema, updatedVacancySchema };
