import { MigrationInterface, QueryRunner } from 'typeorm';

export class Payment1748260693102 implements MigrationInterface {
  name = 'Payment1748260693102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`psychoEmail\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`payment_link\` varchar(255) NOT NULL, \`expires_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerid\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_423d2598fb7f8e4a24b2a0c141b\` FOREIGN KEY (\`customerid\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_423d2598fb7f8e4a24b2a0c141b\``,
    );
    await queryRunner.query(`DROP TABLE \`payment\``);
  }
}
