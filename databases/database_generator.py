import sqlite3
from pathlib import Path


class WP3DatabaseGenerator:
    def __init__(self, database_file, overwrite=False, initial_data=False):
        self.database_file = Path(database_file)
        self.create_initial_data = initial_data
        self.database_overwrite = overwrite
        self.test_file_location()
        self.conn = sqlite3.connect(self.database_file)

    def generate_database(self):
        self.create_table_alle_beperkingen()
        self.create_table_beheerders()
        self.create_table_ervaringsdeskundigen()
        self.create_table_geregistreerde_beperkingen()
        self.create_table_inschrijvingen()
        self.create_table_onderzoeken()
        self.create_table_organisaties()
        if self.create_initial_data:
            self.insert_beperkingen()
            self.insert_beheerders()
            self.insert_ervaringsdeskundigen()
            self.insert_geregistreerde_beperkingen()
            self.insert_inschrijvingen()
            self.insert_onderzoeken()
            self.insert_organisaties()
    def create_table_geregistreerde_beperkingen(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "geregistreerde_beperkingen" (
            "gb_id"	INTEGER,
            "ervaringsdeskundige_id"	INTEGER NOT NULL,
            "beperking_id"	INTEGER NOT NULL,
            PRIMARY KEY("gb_id" AUTOINCREMENT),
            CONSTRAINT "beperking_id_foreign_key" FOREIGN KEY("beperking_id") REFERENCES "alle_beperkingen"("beperking_id"),
            CONSTRAINT "ervaringsdeskundige_id_foreign_key" FOREIGN KEY("ervaringsdeskundige_id") REFERENCES "ervaringsdeskundigen"("ervaringsdeskundige_id"));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ Geregistreerde_beperkingen table created")
    def create_table_inschrijvingen(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "inschrijvingen" (
            "inschrijving_id"	INTEGER,
            "ervaringsdeskundige_id"	INTEGER NOT NULL,
            "onderzoek_id"	INTEGER NOT NULL,
            "status"	TEXT NOT NULL DEFAULT 'nieuw',
            "datum"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "afgerond"	BOOLEAN DEFAULT 0,
            PRIMARY KEY("inschrijving_id" AUTOINCREMENT),
            CONSTRAINT "user_id_foreign_key" FOREIGN KEY("ervaringsdeskundige_id") REFERENCES "ervaringsdeskundigen"("ervaringsdeskundige_id"),
            CONSTRAINT "onderzoek_id_foreign_key" FOREIGN KEY("onderzoek_id") REFERENCES "onderzoeken"("onderzoek_id"));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ inschrijvingen table created")
    def create_table_onderzoeken(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "onderzoeken" (
            "onderzoek_id"	INTEGER,
            "titel"	TEXT NOT NULL,
            "status"	TEXT NOT NULL DEFAULT 'nieuw',
            "beschikbaar"	BOOLEAN NOT NULL DEFAULT 1,
            "beschrijving"	TEXT NOT NULL,
            "datum_vanaf"	DATETIME NOT NULL,
            "datum_tot"	DATETIME NOT NULL,
            "type"	TEXT NOT NULL,
            "locatie"	TEXT,
            "met_beloning"	BOOLEAN NOT NULL DEFAULT 0,
            "beloning"	TEXT,
            "leeftijd_van"	INTEGER,
            "leeftijd_tot"	INTEGER,
            "beperking_id"	INTEGER NOT NULL,
            "beheerder_id"	INTEGER,
            "datum_goedgekeurd"	DATETIME,
            PRIMARY KEY("onderzoek_id" AUTOINCREMENT),
            CONSTRAINT "beheerder_id_foreign_key" FOREIGN KEY("beheerder_id") REFERENCES "",
            CONSTRAINT "beperking_id_foreign_key" FOREIGN KEY("beperking_id") REFERENCES "alle_beperkingen"("beperking_id"));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ onderzoeken table created")
    def create_table_organisaties(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "organisaties" (
            "oraganisatie_id"	INTEGER,
            "naam"	TEXT NOT NULL,
            "wachtwoord"	TEXT,
            "type"	TEXT NOT NULL,
            "website"	TEXT,
            "beschrijving"	TEXT,
            "contactpersoon"	TEXT NOT NULL,
            "email"	TEXT NOT NULL,
            "telefoonnummer"	TEXT NOT NULL,
            "overige_details"	TEXT,
            "status"	TEXT NOT NULL DEFAULT 'nieuw',
            "api_key"	TEXT NOT NULL,
            PRIMARY KEY("oraganisatie_id" AUTOINCREMENT));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ Users table created")
    def create_table_ervaringsdeskundigen(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "ervaringsdeskundigen" (
            "ervaringsdeskundige_id"	INTEGER,
            "voornaam"	TEXT NOT NULL,
            "tussenvoegsel"	TEXT,
            "achternaam"	TEXT NOT NULL,
            "wachtwoord"	TEXT,
            "postcode"	TEXT NOT NULL,
            "geslacht"	TEXT NOT NULL,
            "emailadres"	TEXT NOT NULL,
            "telefoonnummer"	TEXT NOT NULL,
            "geboortedatum"	DATETIME NOT NULL,
            "hulpmiddelen"	TEXT,
            "introductie"	TEXT NOT NULL,
            "bijzonderheden"	TEXT,
            "akkoord_met_voorwaarde"	BOOLEAN NOT NULL DEFAULT 0,
            "toezichthouder"	BOOLEAN DEFAULT 0,
            "naam_voogd"	TEXT,
            "email_voogd"	TEXT,
            "voorkeur_benadering"	TEXT NOT NULL,
            "type_onderzoek"	TEXT NOT NULL,
            "beschikbaarheid"	TEXT,
            "status"	TEXT NOT NULL DEFAULT 'nieuw',
            "kleur_voorgrond"	TEXT NOT NULL DEFAULT 'zwart',
            "kleur_achtergrond"	TEXT NOT NULL DEFAULT 'wit',
            PRIMARY KEY("ervaringsdeskundige_id" AUTOINCREMENT));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ Users table created")
    def create_table_beheerders(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "beheerders" (
            "beheerder_id"	INTEGER,
            "voornaam"	TEXT NOT NULL,
            "tussenvoegsel"	TEXT,
            "achternaam"	TEXT NOT NULL,
            "wachtwoord"	TEXT,
            "email"	TEXT NOT NULL,
            "telefoonnummer"	TEXT,
            "status"	TEXT NOT NULL DEFAULT 'actief',
            PRIMARY KEY("beheerder_id" AUTOINCREMENT));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ Prompts table created")
    def create_table_alle_beperkingen(self):
        create_statement = """
        CREATE TABLE IF NOT EXISTS "alle_beperkingen" (
            "beperking_id"	INTEGER,
            "naam"	TEXT NOT NULL,
            "type"	TEXT NOT NULL,
            PRIMARY KEY("beperking_id" AUTOINCREMENT));
        """
        self.__execute_transaction_statement(create_statement)
        print("✅ Questions table created")

    def insert_beperkingen(self):
        users = [
            ("Doof", "Auditieve beperking"),
            ("Slechthorend", "Auditieve beperking"),
            ("Doofblind", "Auditieve beperking"),
            ("Blind", "Visuele beperking"),
            ("Slechtziend", "Visuele beperking"),
            ("Kleurenblind", "Visuele beperking"),
            ("Doofblind", "Visuele beperking"),
            ("Amputatie en mismaaktheid", "Motorische / lichamelijke beperking"),
            ("Artritus", "Motorische / lichamelijke beperking"),
            ("Fibromyalgie", "Motorische / lichamelijke beperking"),
            ("Reuma", "Motorische / lichamelijke beperking"),
            ("Verminderde handvaardigheid", "Motorische / lichamelijke beperking"),
            ("Spierdystrofie", "Motorische / lichamelijke beperking"),
            ("RSI", "Motorische / lichamelijke beperking"),
            ("Tremor en Spasmen", "Motorische / lichamelijke beperking"),
            ("Quadriplegie of tetraplegie", "Motorische / lichamelijke beperking"),
            ("ADHD", "Cognitieve / neurologische beperking"),
            ("Autisme", "Cognitieve / neurologische beperking"),
            ("Dyslexie", "Cognitieve / neurologische beperking"),
            ("Dyscalculie", "Cognitieve / neurologische beperking"),
            ("Leerstoornis", "Cognitieve / neurologische beperking"),
            ("Geheugen beperking", "Cognitieve / neurologische beperking"),
            ("Multiple Sclerose", "Cognitieve / neurologische beperking"),
            ("Epilepsie", "Cognitieve / neurologische beperking"),
            ("Migraine", "Cognitieve / neurologische beperking"),
        ]
        insert_statement = "INSERT INTO alle_beperkingen (naam, type) VALUES (?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default beperkingen created")
    def insert_beheerders(self):
        users = [
            ( "Kevin", "van", "Dam", "abc", "kevinvandam@gmail.com", "0643396274"),
            ( "Peter", None, "Selie", "123", "peterselie@gmail.com", "0603587210"),
        ]
        insert_statement = "INSERT INTO beheerders (voornaam, tussenvoegsel, achternaam, wachtwoord, email, telefoonnummer) VALUES (?, ?, ?, ?, ?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default beheerders created")
    def insert_ervaringsdeskundigen(self):
        users = [
            ("Erik", None, "Boom", "wachtwoord", "2945KL", "man", "erikboom@gmail.com", "0654925693", "19-01-1987", "blindengeleidehond", "ik ben Erik, ik ben 38 jaar oud en ik ben blind. Mijn hobby is muziek maken", None, True, False, None, None, "email", "op locatie", "nieuw", "zwart", "wit"),
            ("Beau", "ter", "Ham", "MetJam", "3068HG", "vrouw", "beauterham@gmail.com", "0676935683", "29-05-1966", None, "introductie", None, True, True, "Truus van Boven", "truusvanboven@gmail.com", "telefonisch", "telefonisch", "goedgekeurd", "zwart", "wit"),
        ]
        insert_statement = "INSERT INTO ervaringsdeskundigen (voornaam, tussenvoegsel, achternaam, wachtwoord, postcode, geslacht, emailadres, telefoonnummer, geboortedatum, hulpmiddelen, introductie, bijzonderheden, akkoord_met_voorwaarde, toezichthouder, naam_voogd, email_voogd, voorkeur_benadering, type_onderzoek, status, kleur_voorgrond, kleur_achtergrond) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default ervaringsdeskundigen created")
    def insert_geregistreerde_beperkingen(self):
        users = [
            (1, 4),
            (2, 13),
        ]
        insert_statement = "INSERT INTO geregistreerde_beperkingen (ervaringsdeskundige_id, beperking_id) VALUES (?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default geregistreerde beperkingen created")
    def insert_inschrijvingen(self):
        users = [
            ( 1, 1, "nieuw", 0),
        ]
        insert_statement = "INSERT INTO inschrijvingen (ervaringsdeskundige_id, onderzoek_id, status, afgerond) VALUES (?, ?, ?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default inschrijvingen created")
    def insert_onderzoeken(self):
        users = [
            ("website voor blinden", "goedgekeurd", 1, "blinden mensen moeten testen of de website die gemaakt is goed accessible is voor hun", "09-02-2025", "19-02-2027", "op locatie", "hogeschool rotterdam", 1, "5 euro", 10, 60, 4, 1, "10-02-2025"),
            ("onderzoek 2", "nieuw", 0, "beschrijving van onderzoek 2", "02-01-2024", "13-11-2025", "telefonische", None, 0, None, 0, 99, 6, None, None),
        ]
        insert_statement = "INSERT INTO onderzoeken (titel, status, beschikbaar, beschrijving, datum_vanaf, datum_tot, type, locatie, met_beloning, beloning, leeftijd_van, leeftijd_tot, beperking_id, beheerder_id, datum_goedgekeurd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default onderzoeken created")
    def insert_organisaties(self):
        users = [
            ("gfx", None, "non-profit", "https://www.gfx.com", "organisatie", "Angela Koe", "gfx@info.com", "0654826582", "leeg", "goedgekeurd", "A1B2"),
            ("plams", None, "commercieel", "https://www.plams.nl", "ook een organisatie", "Lenn van Dam", "plams@info.com", "0665835683", "het is een organisatie", "nieuw", "C3D4"),
        ]
        insert_statement = "INSERT INTO organisaties (naam, wachtwoord, type, website, beschrijving, contactpersoon, email, telefoonnummer, overige_details, status, api_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        self.__execute_many_transaction_statement(insert_statement, users)
        print("✅ Default organisaties created")

    # Transacties zijn duur, dat wil zeggen, ze kosten veel tijd en CPU kracht. Als je veel insert doet
    # bundel je ze in één transactie, of je gebruikt de SQLite executemany methode.
    def __execute_many_transaction_statement(
        self, create_statement, list_of_parameters=()
    ):
        c = self.conn.cursor()
        c.executemany(create_statement, list_of_parameters)
        self.conn.commit()

    def __execute_transaction_statement(self, create_statement, parameters=()):
        c = self.conn.cursor()
        c.execute(create_statement, parameters)
        self.conn.commit()

    def test_file_location(self):
        if not self.database_file.parent.exists():
            raise ValueError(
                f"Database file location {self.database_file.parent} does not exist"
            )
        if self.database_file.exists():
            if not self.database_overwrite:
                raise ValueError(
                    f"Database file {self.database_file} already exists, set overwrite=True to overwrite"
                )
            else:
                # Unlink verwijdert een bestand
                self.database_file.unlink()
                print("✅ Database already exists, deleted")
        if not self.database_file.exists():
            try:
                self.database_file.touch()
                print("✅ New database setup")
            except Exception as e:
                raise ValueError(
                    f"Could not create database file {self.database_file} due to error {e}"
                )


if __name__ == "__main__":
    my_path = Path(__file__).parent.resolve()
    project_root = my_path.parent.parent
    # Deze slashes komen uit de "Path" module. Dit is een module die je kan gebruiken
    # om paden te maken. Dit is handig omdat je dan niet zelf hoeft te kijken of je
    # een / (mac) of een \ (windows) moet gebruiken.
    database_path = project_root / "wp3-2025-rest-1b4-insertteamnamehere" / "databases" / "database.db"
    database_generator = WP3DatabaseGenerator(
        database_path, overwrite=True, initial_data=True
    )
    database_generator.generate_database()