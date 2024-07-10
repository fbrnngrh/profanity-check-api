import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1720612683606 implements MigrationInterface {
    name = 'InitialMigration1720612683606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`word_variation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`variation\` varchar(50) NOT NULL, \`profanityWordId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`apiKey\` varchar(64) NOT NULL, \`email\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL, \`lastLogin\` datetime NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_b3c53c577ce390cb3a4550e6d9\` (\`apiKey\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`check_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`textChecked\` text NOT NULL, \`profanityFound\` tinyint NOT NULL, \`profanityCount\` int NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profanity_word\` (\`id\` int NOT NULL AUTO_INCREMENT, \`word\` varchar(50) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, \`categoryId\` int NULL, UNIQUE INDEX \`IDX_1168f339abe093cd1d94455e5a\` (\`word\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`custom_profanity_word\` (\`id\` int NOT NULL AUTO_INCREMENT, \`word\` varchar(50) NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`word_variation\` ADD CONSTRAINT \`FK_09eb4f46110a8f586a1e15a5182\` FOREIGN KEY (\`profanityWordId\`) REFERENCES \`profanity_word\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_log\` ADD CONSTRAINT \`FK_af97a5cfefe21289a037a3e9d3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profanity_word\` ADD CONSTRAINT \`FK_b24765d4b0658cec0339bc3e186\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`custom_profanity_word\` ADD CONSTRAINT \`FK_32cc77cd7be1334d6aca66b0092\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`custom_profanity_word\` ADD CONSTRAINT \`FK_21a47e552d9be062f8990784cd4\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hapus semua foreign key terlebih dahulu
        await queryRunner.query(`ALTER TABLE \`custom_profanity_word\` DROP FOREIGN KEY \`FK_21a47e552d9be062f8990784cd4\``);
        await queryRunner.query(`ALTER TABLE \`custom_profanity_word\` DROP FOREIGN KEY \`FK_32cc77cd7be1334d6aca66b0092\``);
        await queryRunner.query(`ALTER TABLE \`profanity_word\` DROP FOREIGN KEY \`FK_b24765d4b0658cec0339bc3e186\``);
        await queryRunner.query(`ALTER TABLE \`check_log\` DROP FOREIGN KEY \`FK_af97a5cfefe21289a037a3e9d3b\``);
        await queryRunner.query(`ALTER TABLE \`word_variation\` DROP FOREIGN KEY \`FK_09eb4f46110a8f586a1e15a5182\``);

        // Hapus indeks yang mungkin dibuat secara implisit
        await queryRunner.query(`DROP INDEX \`idx_check_logs_userId_createdAt\` ON \`check_log\``);

        // Lanjutkan dengan penghapusan tabel dan indeks lainnya
        await queryRunner.query(`DROP TABLE \`custom_profanity_word\``);
        await queryRunner.query(`DROP INDEX \`IDX_1168f339abe093cd1d94455e5a\` ON \`profanity_word\``);
        await queryRunner.query(`DROP TABLE \`profanity_word\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`check_log\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3c53c577ce390cb3a4550e6d9\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`word_variation\``);
    }

}