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
const { newVacancySchema, updatedVacancySchema } = require("./vacancies");

module.exports = {
  nameSchema,
  newPermissionSchema,
  newRatingSchema,
  newProjectSchema,
  newUserSchema,
  newVacancySchema,
  userLoginSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedRatingSchema,
  updatedUserSchema,
  updatedVacancySchema,
};
