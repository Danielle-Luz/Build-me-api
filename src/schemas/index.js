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
const {
  newUserSkillsSchema,
  updatedUserSkillsSchema,
} = require("./userSkills");

module.exports = {
  nameSchema,
  newLearnerSchema,
  newPermissionSchema,
  newRatingSchema,
  newProjectSchema,
  newTechnologySchema,
  newUserSchema,
  newUserSkillsSchema,
  newVacancySchema,
  newVacancyRequirementSchema,
  userLoginSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedRatingSchema,
  updatedTechnologySchema,
  updatedUserSchema,
  updatedUserSkillsSchema,
  updatedVacancySchema,
  updatedVacancyRequirementSchema,
};
