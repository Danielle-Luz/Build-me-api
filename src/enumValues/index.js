const memberSelectionMethod = [
  "Aleatória",
  "Ordem de inscrição",
  "Escolha manual",
];

const skillLevels = ["Básico", "Intermediário", "Avançado"];

const associationLimitsByEntity = {
  vacancy: 3,
  learner: 5,
};

module.exports = {
  memberSelectionMethod,
  skillLevels,
  associationLimitsByEntity,
};
