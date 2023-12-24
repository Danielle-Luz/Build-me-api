const { z } = require("zod");

const newUserSchema = z.object({
  username: z.string().max(30),
  firstName: z.string().max(40),
  lastName: z.string().max(50),
  email: z.string().max(120).email(),
  password: z.string().max(12),
  githubUsername: z.string().max(50).optional(),
  linkedinUrl: z.string().optional(),
});

const userLoginSchema = newUserSchema.pick({
  email: true,
  password: true,
});

module.exports = { newUserSchema, userLoginSchema };
