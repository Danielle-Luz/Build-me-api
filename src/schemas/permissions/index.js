const { z } = require("zod");

const newPermissionSchema = z.object({
  create: z.boolean(),
  update: z.boolean(),
  read: z.boolean(),
  delete: z.boolean(),
  role_id: z.number(),
  resource_id: z.number(),
});

module.exports = { newPermissionSchema };
