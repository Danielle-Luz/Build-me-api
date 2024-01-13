module.exports = class AddedProjectStatusColumn1705158052442 {
  name = "AddedProjectStatusColumn1705158052442";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "status" character varying NOT NULL DEFAULT 'Não iniciado'`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
  }
};
