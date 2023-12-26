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
const { newLearnerSchema, updatedLearnerSchema } = require("./learners");

module.exports = {
  nameSchema,
  newLearnerSchema,
  newPermissionSchema,
  newRatingSchema,
  newProjectSchema,
  newUserSchema,
  newVacancySchema,
  userLoginSchema,
  updatedLearnerSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedRatingSchema,
  updatedUserSchema,
  updatedVacancySchema,
};
