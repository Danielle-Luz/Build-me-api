const z = require("zod");
const { memberSelectionMethod, projectStatus } = require("../../enumValues");

const newProjectSchema = z.object({
  name: z.string().max(100),
  description: z.string(),
  closeDate: z.coerce.date(),
  repositoryUrl: z.string().nullable(),
  memberSelectionMethod: z.enum(memberSelectionMethod),
});

const updateProjectSchema = newProjectSchema
  .partial()
  .extend({ status: z.enum(projectStatus) });

module.exports = { newProjectSchema, updateProjectSchema };
