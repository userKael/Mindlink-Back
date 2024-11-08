import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731070760802 implements MigrationInterface {
    name = 'Migrations1731070760802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`diary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`psychoEmail\` varchar(255) NOT NULL, \`date\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerid\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`diary\` ADD CONSTRAINT \`FK_74dc21dcc6cfc1c4914fc416381\` FOREIGN KEY (\`customerid\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`diary\` DROP FOREIGN KEY \`FK_74dc21dcc6cfc1c4914fc416381\``);
        await queryRunner.query(`DROP TABLE \`diary\``);
    }

}
