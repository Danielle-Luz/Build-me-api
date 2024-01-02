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
const { newQuestionSchema, updatedQuestionSchema } = require("./questions");
const { newAnswerSchema, updatedAnswerSchema } = require("./answers");
const { newTestAnswers } = require("./tests");

module.exports = {
  nameSchema,
  newAnswerSchema,
  newLearnerSchema,
  newPermissionSchema,
  newProjectSchema,
  newQuestionSchema,
  newRatingSchema,
  newTechnologySchema,
  newTestAnswers,
  newUserSchema,
  userSkillsSchema,
  newVacancySchema,
  newVacancyRequirementSchema,
  newVacancySubscriptionSchema,
  updatedAnswerSchema,
  updatedPermissionSchema,
  updateProjectSchema,
  updatedQuestionSchema,
  updatedRatingSchema,
  updatedTechnologySchema,
  updatedUserSchema,
  updatedVacancySchema,
  updatedVacancyRequirementSchema,
  userLoginSchema,
};
