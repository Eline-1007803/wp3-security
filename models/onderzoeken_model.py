from models.database_conection import Database

class Onderzoeken:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*, organisaties.naam as orga_naam, alle_beperkingen.naam as bep_naam
                FROM onderzoeken 
                FULL JOIN organisaties ON (onderzoeken.organisatie_id = organisaties.organisatie_id)
                FULL JOIN onderzoek_beperkingen on (onderzoeken.onderzoek_id = onderzoek_beperkingen.onderzoek_id)
                FULL JOIN alle_beperkingen on (onderzoek_beperkingen.beperking_id = alle_beperkingen.beperking_id)
                WHERE onderzoeken.status = 'nieuw'""").fetchall()
        return result
    
    def get_open_research(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*
                FROM onderzoeken
                WHERE onderzoeken.status = 'goedgekeurd'""").fetchall()
        
        return result
    
    def get_research_details(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*
        """
        ).fetchone()
        return result
    
    def get_signedup_research(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*
                FROM onderzoeken
                
"""
        )