from models.database_conection import Database

class Onderzoeken:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_pending(self):
        result = self.cursor.execute(
            """ SELECT onderzoeken.*, organisaties.naam
                FROM onderzoeken FULL JOIN organisaties ON (onderzoeken.organisatie_id = organisaties.organisatie_id)
                WHERE onderzoeken.status = 'nieuw'""").fetchall()
        return result