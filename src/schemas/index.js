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
const {
  newTechnologySchema,
  updatedTechnologySchema,
} = require("./technologies");
const { newVacancySchema, updatedVacancySchema } = require("./vacancies");
const { newLearnerSchema } = require("./learners");
const {
  newVacancyRequirementSchema,
  updatedVacancyRequirementSchema,
} = require("./vacancyRequirements");
const { userSkillsSchema } = require("./userSkills");
const { newVacancySubscriptionSchema } = require("./vacancySubscriptions");

module.exports = {
  nameSchema,
  newLearnerSchema,
  newPermissionSchema,
  newRatingSchema,
  newProjectSchema,
  newTechnologySchema,
  newUserSchema,
  userSkillsSchema,
  newVacancySchema,
  newVacancyRequirementSchema,
  newVacancySubscriptionSchema,
  userLoginSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedRatingSchema,
  updatedTechnologySchema,
  updatedUserSchema,
  updatedVacancySchema,
  updatedVacancyRequirementSchema,
};
