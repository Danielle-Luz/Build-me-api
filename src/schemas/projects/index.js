const z = require("zod");
const { memberSelectionMethod } = require("../../enumValues");

const newProjectSchema = z.object({
  name: z.string().max(100),
  description: z.string(),
  closeDate: z.coerce.date(),
  repositoryUrl: z.string().nullable(),
  memberSelectionMethod: z.enum(memberSelectionMethod),
});

const updateProjectSchema = newProjectSchema.partial();

module.exports = { newProjectSchema, updateProjectSchema };
