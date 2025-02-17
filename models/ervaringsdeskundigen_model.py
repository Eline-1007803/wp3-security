from models.database_conection import Database

class Ervaringsdeskundigen:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT ervaringsdeskundigen.*, alle_beperkingen.naam, ervaringsdeskundigen.voornaam || ' ' || coalesce(ervaringsdeskundigen.tussenvoegsel || ' ' || ervaringsdeskundigen.achternaam, ervaringsdeskundigen.achternaam) as volle_naam,
                (strftime('%Y', 'now') - strftime('%Y', ervaringsdeskundigen.geboortedatum) - (strftime('%m-%d', 'now') < strftime('%m-%d', ervaringsdeskundigen.geboortedatum))) AS leeftijd
                FROM ervaringsdeskundigen 
                full join geregistreerde_beperkingen on (ervaringsdeskundigen.ervaringsdeskundige_id=geregistreerde_beperkingen.ervaringsdeskundige_id)
                full join alle_beperkingen on (geregistreerde_beperkingen.beperking_id = alle_beperkingen.beperking_id)
                WHERE status = 'nieuw'""").fetchall()
        return result