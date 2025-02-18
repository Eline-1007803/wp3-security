from models.database_conection import Database

class Inschrijvingen:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT ervaringsdeskundigen.voornaam || ' ' || coalesce(ervaringsdeskundigen.tussenvoegsel || ' ' || ervaringsdeskundigen.achternaam, ervaringsdeskundigen.achternaam) as volle_naam,
                onderzoeken.*, ervaringsdeskundigen.*
                FROM inschrijvingen
                full join ervaringsdeskundigen on (ervaringsdeskundigen.ervaringsdeskundige_id=inschrijvingen.ervaringsdeskundige_id)
                full join onderzoeken on (onderzoeken.onderzoek_id = inschrijvingen.onderzoek_id)
                WHERE inschrijvingen.status = 'nieuw'""").fetchall()
        return result