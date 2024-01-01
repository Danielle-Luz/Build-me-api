module.exports = class AddSkillLevelScoreColumn1704067885020 {
  name = "AddSkillLevelScoreColumn1704067885020";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" ADD "skillLevelScore" integer`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "vacancy_requirements" DROP COLUMN "skillLevelScore"`
    );
  }
};
