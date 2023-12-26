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
const { newProjectSchema, updateProjectSchema } = require("./projects");

module.exports = {
  nameSchema,
  newPermissionSchema,
  newRatingSchema,
  newProjectSchema,
  newUserSchema,
  userLoginSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedRatingSchema,
  updatedUserSchema,
};
