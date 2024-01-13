const memberSelectionMethod = [
  "Aleatória",
  "Ordem de inscrição",
  "Escolha manual",
];

const skillLevels = ["Básico", "Intermediário", "Avançado"];

const skillLevelScores = {
  "Básico": 0,
  "Intermediário": 1000,
  "Avançado": 2000,
};

const associationLimitsByEntity = {
  vacancy: 3,
  learner: 5,
};

const projectStatus = ["Não iniciado", "Em progresso", "Finalizado"];

module.exports = {
  associationLimitsByEntity,
  memberSelectionMethod,
  skillLevels,
  skillLevelScores,
  projectStatus
};
