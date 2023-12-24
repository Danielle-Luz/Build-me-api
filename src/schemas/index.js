const {
  newUserSchema,
  userLoginSchema,
  updatedUserSchema,
} = require("./users/index");
const { nameSchema } = require("./utils/index");
const { newPermissionSchema } = require("./permissions/index");

module.exports = {
  nameSchema,
  newPermissionSchema,
  newUserSchema,
  userLoginSchema,
  updatedUserSchema,
};
