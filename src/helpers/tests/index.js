const { skillLevelScores } = require("../../enumValues");

class TestsHelper {
  static calculateTestScore(testAnswers) {
    return (currentScore, questionWithRightAnswer) => {
      const userTestAnswer = testAnswers.find(
        ({ questionId: answeredQuestionId }) =>
          answeredQuestionId == questionWithRightAnswer.id
      );

      const isUserAnswerRight =
        userTestAnswer.answerId == questionWithRightAnswer.answers[0].id;

      if (!isUserAnswerRight) {
        return currentScore + 0;
      }

      const baseScore = 100;
      const scoreToBeAdded =
        baseScore * questionWithRightAnswer.difficultyLevel;

      return currentScore + scoreToBeAdded;
    };
  }

  static getSkillLevelFromTestScore(testScore) {
    const descendingSkillLevelScoresValues =
      Object.values(skillLevelScores).reverse();

    const skillLevelReversedIndex = descendingSkillLevelScoresValues.findIndex(
      (scoreValue) => testScore >= scoreValue
    );

    const skillLevelIndex =
      descendingSkillLevelScoresValues.length - 1 - skillLevelReversedIndex;

    const skillLevelsNames = Object.keys(skillLevelScores);

    return skillLevelsNames[skillLevelIndex];
  }
}

module.exports = { TestsHelper };
