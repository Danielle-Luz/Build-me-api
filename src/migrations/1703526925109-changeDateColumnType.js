class ChangeDateColumnType1703526925109 {
  name = "ChangeDateColumnType1703526925109";

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD "createdDate" date NOT NULL DEFAULT now()`
    );
  }
}

module.exports = { ChangeDateColumnType1703526925109 };
