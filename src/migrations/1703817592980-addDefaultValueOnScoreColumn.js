module.exports = class AddDefaultValueOnScoreColumn1703817592980 {
  name = "AddDefaultValueOnScoreColumn1703817592980";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "userSkills" ALTER COLUMN "score" SET DEFAULT 0`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "userSkills" ALTER COLUMN "score" SET DEFAULT NULL`
    );
  }
};
