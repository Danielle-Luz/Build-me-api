module.exports = class AddStatusColumnOnVotation1704435019738 {
  name = "AddStatusColumnOnVotation1704435019738";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "votations" ADD "isOpen" boolean NOT NULL DEFAULT true`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "votations" DROP COLUMN "isOpen"`);
  }
};
