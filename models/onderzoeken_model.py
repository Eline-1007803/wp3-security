from models.database_conection import Database

class Onderzoeken:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*, organisaties.naam as orga_naam
                FROM onderzoeken 
                JOIN organisaties ON (onderzoeken.organisatie_id = organisaties.organisatie_id)
                WHERE onderzoeken.status = 'nieuw'""").fetchall()
        return result

    def get_corresponding_beperkingen(self, onderzoeken_id):
        result = self.cursor.execute(
            """ SELECT alle_beperkingen.naam as bep_naam
                FROM onderzoek_beperkingen
                JOIN alle_beperkingen on (onderzoek_beperkingen.beperking_id = alle_beperkingen.beperking_id)
                WHERE onderzoek_beperkingen.onderzoek_id = ?""", (onderzoeken_id,)).fetchall()
        return result
    
    def get_open_research(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*
                FROM onderzoeken
                WHERE onderzoeken.status = 'goedgekeurd'""").fetchall()
        
        onderzoek_lijst = [dict(row) for row in result]
        return onderzoek_lijst
    
    def get_signedup_research(self, ervaringsdeskundige_id):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*, inschrijvingen.*, inschrijvingen.status as inschrijving_status
                FROM inschrijvingen
                JOIN onderzoeken ON (onderzoeken.onderzoek_id = inschrijvingen.onderzoek_id)
                WHERE inschrijvingen.ervaringsdeskundige_id = ?
            """,(ervaringsdeskundige_id,)).fetchall()

        onderzoek_lijst = [dict(row) for row in result]
        return onderzoek_lijst


    def update_status(self, onderzoek_id, status, admin_id, date):
        self.cursor.execute("UPDATE onderzoeken SET status = ?, beheerder_id = ?, datum_goedgekeurd = ? WHERE onderzoek_id = ?", (status, admin_id, date, onderzoek_id))
        self.con.commit()

    def inschrijving(self, ervaringsdeskundige_id, onderzoek_id):
        result = self.cursor.execute(
        """INSERT INTO inschrijvingen (ervaringsdeskundige_id, onderzoek_id) 
           VALUES (?, ?)""",
        (ervaringsdeskundige_id, onderzoek_id),
        )
        self.con.commit()

        return result