const { z } = require("zod");

const newPermissionSchema = z.object({
  create: z.boolean(),
  update: z.boolean(),
  read: z.boolean(),
  delete: z.boolean(),
  roleId: z.number(),
  resourceId: z.number(),
});

const updatedPermissionSchema = newPermissionSchema.partial();

module.exports = { newPermissionSchema, updatedPermissionSchema };
