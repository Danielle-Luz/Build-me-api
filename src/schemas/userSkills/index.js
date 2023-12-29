const z = require("zod");

const newUserSkillsSchema = z.object({
  userId: z.number(),
  technologyId: z.number(),
});

const updatedUserSkillsSchema = newUserSkillsSchema.omit({ userId: true });

module.exports = {
  newUserSkillsSchema,
  updatedUserSkillsSchema,
};
