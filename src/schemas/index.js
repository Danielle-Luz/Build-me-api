const {
  newUserSchema,
  userLoginSchema,
  updatedUserSchema,
} = require("./users/index");
const { nameSchema } = require("./utils/index");
const {
  newPermissionSchema,
  updatedPermissionSchema,
} = require("./permissions/index");

module.exports = {
  nameSchema,
  newPermissionSchema,
  newUserSchema,
  userLoginSchema,
  updatedPermissionSchema,
  updatedUserSchema,
};
