class CreateRatingDateColumn1703524111541 {
  name = "CreateRatingDateColumn1703524111541";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD "createdDate" date NOT NULL DEFAULT now()`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "createdDate"`);
  }
}

module.exports = { CreateRatingDateColumn1703524111541 };
