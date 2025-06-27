<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250627065935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP SEQUENCE guide_id_seq1 CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE utilisateur_id_seq1 CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            DROP SEQUENCE visite_id_seq1 CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE guide ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX guide_email_key RENAME TO UNIQ_CA9EC735E7927C74
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER date_creation DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER date_creation SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX utilisateur_email_key RENAME TO UNIQ_1D1C63B3E7927C74
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER visiteurs DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER visiteurs SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER statut DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER statut SET NOT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE guide_id_seq1 INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE utilisateur_id_seq1 INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE visite_id_seq1 INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE guide_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('guide_id_seq', (SELECT MAX(id) FROM guide))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE guide ALTER id SET DEFAULT nextval('guide_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX uniq_ca9ec735e7927c74 RENAME TO guide_email_key
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE utilisateur_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('utilisateur_id_seq', (SELECT MAX(id) FROM utilisateur))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER id SET DEFAULT nextval('utilisateur_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER date_creation SET DEFAULT CURRENT_TIMESTAMP
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE utilisateur ALTER date_creation DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER INDEX uniq_1d1c63b3e7927c74 RENAME TO utilisateur_email_key
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE visite_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('visite_id_seq', (SELECT MAX(id) FROM visite))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER id SET DEFAULT nextval('visite_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER visiteurs SET DEFAULT '[]'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER visiteurs DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER statut SET DEFAULT 'planifiee'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE visite ALTER statut DROP NOT NULL
        SQL);
    }
}
