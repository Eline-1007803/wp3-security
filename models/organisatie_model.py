from models.database import Database

class Organisatie:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()
    
    def insert_onderzoek(self,titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,locatie,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot,organisatie_id):
        self.cursor.execute(
            "INSERT into onderzoeken (titel,beschrijving,datum_vanaf,datum_tot,type,locatie,met_beloning,beloning,leeftijd_van,leeftijd_tot,organisatie_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            (titel,beschjrijving,datum_vanaf,datum_tot,typeonderzoek,locatie,vergoeding,hoeveel_vergoeding,leeftijd_vanaf,leeftijd_tot,organisatie_id))
        self.con.commit()
        return True
    def get_last_onderzoek_id(self):
        result =self.cursor.execute(
        "SELECT max(onderzoek_id) FROM onderzoeken").fetchone()
        return result
    def insert_onderzoek_disability(self, onderzoek_id, disability_id):
        self.cursor.execute(
            "INSERT INTO onderzoek_beperkingen (onderzoek_id, beperking_id) VALUES (?, ?)",
            (onderzoek_id, disability_id)
        )
        self.con.commit()
        return True
    def update_onderzoek(self,title,beschrijving,datumvanaf,datumtot,onderzoek_id):
        self.cursor.execute(
            "INSERT INTO x (title, beschrijving,datumvanaf,datumtot,onderzoek_id) VALUES (?,?,? ?,?)",
            (title, beschrijving,datumvanaf,datumtot,onderzoek_id)
        )
        self.con.commit()
        return True