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
const { newRatingSchema, updatedRatingSchema } = require("./ratings");

module.exports = {
  nameSchema,
  newPermissionSchema,
  newRatingSchema,
  newUserSchema,
  userLoginSchema,
  updatedPermissionSchema,
  updatedRatingSchema,
  updatedUserSchema,
};
