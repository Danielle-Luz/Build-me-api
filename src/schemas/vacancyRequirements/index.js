const { z } = require("zod");
const { skillLevels } = require("../../enumValues");

const newVacancyRequirementSchema = z.object({
  vacancyId: z.number(),
  technologyId: z.number(),
  skillLevel: z.enum(skillLevels),
});

const updatedVacancyRequirementSchema = newVacancyRequirementSchema
  .omit({ vacancyId: true })
  .partial();

module.exports = {
  newVacancyRequirementSchema,
  updatedVacancyRequirementSchema,
};
