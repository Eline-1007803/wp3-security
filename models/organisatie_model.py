from models.database import Database

class Organisatie:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()
    
    def insert_onderzoek(self,titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot,beperking_id):
        self.cursor.execute(
            "INSERT into onderzoeken (titel,beschrijving,datum_vanaf,datum_tot,type,met_beloning,beloning,leeftijd_van,leeftijd_tot,beperking_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
            (titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot,beperking_id))
        self.con.commit()
        return True