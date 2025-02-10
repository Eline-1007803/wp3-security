from models.database import Database

class Organisatie:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()
    
    def insert_onderzoek():
        pass