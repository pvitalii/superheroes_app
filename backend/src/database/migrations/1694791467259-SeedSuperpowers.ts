import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSuperpowers1694791467259 implements MigrationInterface {
  private superpowers = ['Solar energy absorption'];
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "superpower"("name") 
        VALUES 
            ('Solar energy absorption'), 
            ('Healing factor'), 
            ('Solar flare'),
            ('Heat vision'),
            ('Solar invulnerability'),
            ('Flight');
        `
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "name" TO "title"`); // reverts things made in "up" method
  }
}
