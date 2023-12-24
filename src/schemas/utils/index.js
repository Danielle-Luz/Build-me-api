const { z } = require("zod");

const nameSchema = z.object({ name: z.string().max(30) });

module.exports = { nameSchema };
