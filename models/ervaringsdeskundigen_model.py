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
    def update_status(self, deskundige_id, status):
        self.cursor.execute("UPDATE ervaringsdeskundigen SET status = ? WHERE ervaringsdeskundige_id = ?", (status, deskundige_id))
        self.con.commit()

    def get_expert(self, expert_id, email, password, ):
        result = self.cursor.execute('''SELECT ervaringsdeskundige_id, emailadres, wachtwoord FROM ervaringsdeskundigen WHERE ervaringsdeskundige_id =?''', (expert_id, email, password)).fetchone()
        return result

    def authentication_expert(self, email, password):
        result =  self.cursor.execute('''SELECT ervaringsdeskundige_id FROM ervaringsdeskundigen WHERE emailadres = ? AND wachtwoord = ?''', (email, password)).fetchone()
        if result:
            return dict(result)
