const { AppError } = require("./AppError/index");
const {
  AssociationLimitReachedError,
} = require("./AssociationLimitReachedError");
const { CloseDateError } = require("./CloseDateError");
const { DuplicatedInfoError } = require("./DuplicatedInfoError/index");
const { InvalidBodyError } = require("./InvalidBodyError");
const { InvalidLoginInfoError } = require("./InvalidLoginInfoError/index");
const { InvalidParamValueError } = require("./InvalidParamValueError");
const { InvalidTokenError } = require("./InvalidTokenError/index");
const { NoPermissionError } = require("./NoPermissionError");
const { RecordNotFoundError } = require("./RecordNotFoundError/index");
const { VacancyRequirementsError } = require("./VacancyRequirementsError");

module.exports = {
  AppError,
  AssociationLimitReachedError,
  CloseDateError,
  DuplicatedInfoError,
  InvalidBodyError,
  InvalidLoginInfoError,
  InvalidParamValueError,
  InvalidTokenError,
  NoPermissionError,
  RecordNotFoundError,
  VacancyRequirementsError,
};
