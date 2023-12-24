class ChangeFksPermissionNamesAndAddUniqueConstraint1703443267956 {
  name = "ChangeFksPermissionNamesAndAddUniqueConstraint1703443267956";

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "resources" ADD CONSTRAINT "UQ_f276c867b5752b7cc2c6c797b2b" UNIQUE ("name")`
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`
    );
    await queryRunner.query(
      `ALTER TABLE "resources" DROP CONSTRAINT "UQ_f276c867b5752b7cc2c6c797b2b"`
    );
  }
}
