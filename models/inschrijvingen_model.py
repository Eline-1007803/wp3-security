from models.database_conection import Database

class Inschrijvingen:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT ervaringsdeskundigen.voornaam || ' ' || coalesce(ervaringsdeskundigen.tussenvoegsel || ' ' || ervaringsdeskundigen.achternaam, ervaringsdeskundigen.achternaam) as volle_naam,
                onderzoeken.*, ervaringsdeskundigen.*, ev_bep.naam as ev_bep_naam, organisaties.naam as orga_naam, on_bep.naam as on_bep_naam, inschrijvingen.inschrijving_id
                FROM inschrijvingen
                full join ervaringsdeskundigen on (ervaringsdeskundigen.ervaringsdeskundige_id=inschrijvingen.ervaringsdeskundige_id)
                full join onderzoeken on (onderzoeken.onderzoek_id = inschrijvingen.onderzoek_id)
                full join geregistreerde_beperkingen on (ervaringsdeskundigen.ervaringsdeskundige_id=geregistreerde_beperkingen.ervaringsdeskundige_id)
                full join alle_beperkingen as ev_bep on (geregistreerde_beperkingen.beperking_id = ev_bep.beperking_id)
                full join onderzoek_beperkingen on (onderzoeken.onderzoek_id = onderzoek_beperkingen.onderzoek_id)
                full join alle_beperkingen as on_bep on (onderzoek_beperkingen.beperking_id = on_bep.beperking_id)
                full join organisaties on (onderzoeken.organisatie_id = organisaties.organisatie_id)
                WHERE inschrijvingen.status = 'nieuw'""").fetchall()
        return result
    def update_status(self, inschrijving_id, status):
        self.cursor.execute("UPDATE inschrijvingen SET status = ? WHERE inschrijving_id = ?", (status, inschrijving_id))
        self.con.commit()