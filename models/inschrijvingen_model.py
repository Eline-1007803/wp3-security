from models.database_conection import Database

class Inschrijvingen:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT ervaringsdeskundigen.voornaam || ' ' || coalesce(ervaringsdeskundigen.tussenvoegsel || ' ' || ervaringsdeskundigen.achternaam, ervaringsdeskundigen.achternaam) as volle_naam,
                onderzoeken.*, ervaringsdeskundigen.*, organisaties.naam as orga_naam, inschrijvingen.inschrijving_id
                FROM inschrijvingen
                join ervaringsdeskundigen on (ervaringsdeskundigen.ervaringsdeskundige_id=inschrijvingen.ervaringsdeskundige_id)
                join onderzoeken on (onderzoeken.onderzoek_id = inschrijvingen.onderzoek_id)
                join organisaties on (onderzoeken.organisatie_id = organisaties.organisatie_id)
                WHERE inschrijvingen.status = 'nieuw'""").fetchall()
        return result

    def get_corresponding_beperkingen(self, ervaringsdeskundige_id, onderzoeken_id):
        ev_result = self.cursor.execute(
            """ SELECT alle_beperkingen.naam as ev_bep_naam
                FROM geregistreerde_beperkingen
                join alle_beperkingen on (geregistreerde_beperkingen.beperking_id = alle_beperkingen.beperking_id)
                WHERE geregistreerde_beperkingen.ervaringsdeskundige_id = ?""", (ervaringsdeskundige_id,)).fetchall()

        on_result = self.cursor.execute(
            """ SELECT alle_beperkingen.naam as on_bep_naam
                FROM onderzoek_beperkingen
                JOIN alle_beperkingen on (onderzoek_beperkingen.beperking_id = alle_beperkingen.beperking_id)
                WHERE onderzoek_beperkingen.onderzoek_id = ?""", (onderzoeken_id,)).fetchall()
        return ev_result, on_result
    def update_status(self, inschrijving_id, status):
        self.cursor.execute("UPDATE inschrijvingen SET status = ? WHERE inschrijving_id = ?", (status, inschrijving_id))
        self.con.commit()