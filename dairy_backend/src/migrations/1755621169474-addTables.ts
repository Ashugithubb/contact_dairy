import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1755621169474 implements MigrationInterface {
    name = 'AddTables1755621169474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, CONSTRAINT "UQ_a0e006b29d7876b2f5a4df70a37" UNIQUE ("tagName"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_tags" ("id" SERIAL NOT NULL, "contactId" integer, "tagId" integer, CONSTRAINT "UQ_a3041f90db2a5db991492c2f5e6" UNIQUE ("contactId", "tagId"), CONSTRAINT "PK_4e03788e7aac2227880c6fc3f7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phone_numbers" ("phoneNumberId" SERIAL NOT NULL, "phoneNumber" character varying NOT NULL, "contactId" integer, CONSTRAINT "PK_a6fb903039db5c518d0f5e01a4e" PRIMARY KEY ("phoneNumberId"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "nickName" character varying NOT NULL, "email" character varying NOT NULL, "favorite" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "avtarUrl" character varying, "userId" integer, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "contact_tags" ADD CONSTRAINT "FK_84e8e0c964693dbb82ab916cb6c" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_tags" ADD CONSTRAINT "FK_82591870c7d4f98a256c719e661" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" ADD CONSTRAINT "FK_76f70b343fea50ff249f560330e" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers" DROP CONSTRAINT "FK_76f70b343fea50ff249f560330e"`);
        await queryRunner.query(`ALTER TABLE "contact_tags" DROP CONSTRAINT "FK_82591870c7d4f98a256c719e661"`);
        await queryRunner.query(`ALTER TABLE "contact_tags" DROP CONSTRAINT "FK_84e8e0c964693dbb82ab916cb6c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "phone_numbers"`);
        await queryRunner.query(`DROP TABLE "contact_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
