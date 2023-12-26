class AddDeletedDateColumn1703564734421 {
  name = "AddDeletedDateColumn1703564734421";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "deletedDate" TIMESTAMP`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "deletedDate"`);
  }
}

module.exports = { AddDeletedDateColumn1703564734421 };
