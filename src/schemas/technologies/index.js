const z = require("zod");

const newTechnologySchema = z.object({
  name: z.string().max(50),
  iconUrl: z.string().optional(),
});

const updatedTechnologySchema = newTechnologySchema.partial();

module.exports = { newTechnologySchema, updatedTechnologySchema };
