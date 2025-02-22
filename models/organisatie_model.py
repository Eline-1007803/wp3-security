from models.database import Database

class Organisatie:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()
    
    def insert_onderzoek(self,titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,locatie,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot):
        self.cursor.execute(
            "INSERT into onderzoeken (titel,beschrijving,datum_vanaf,datum_tot,type,locatie,met_beloning,beloning,leeftijd_van,leeftijd_tot) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            (titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,locatie,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot))
        self.con.commit()
        return True
    def get_last_onderzoek_id(self):
        result =self.cursor.execute(
        "SELECT max(onderzoek_id) FROM onderzoeken").fetchone()
        return result