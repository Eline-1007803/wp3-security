from models.database import Database


class Organisatie:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def insert_onderzoek(
        self,
        titel,
        beschjrijving,
        datum_vanaf,
        datum_tot,
        typeonderzoek,
        locatie,
        vergoeding,
        hoeveel_vergoeding,
        leeftijd_vanaf,
        leeftijd_tot,
        organisatie_id,
    ):
        self.cursor.execute(
            "INSERT into onderzoeken (titel,beschrijving,datum_vanaf,datum_tot,type,locatie,met_beloning,beloning,leeftijd_van,leeftijd_tot,organisatie_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            (
                titel,
                beschjrijving,
                datum_vanaf,
                datum_tot,
                typeonderzoek,
                locatie,
                vergoeding,
                hoeveel_vergoeding,
                leeftijd_vanaf,
                leeftijd_tot,
                organisatie_id,
            ),
        )
        self.con.commit()
        return True

    def get_all_onderzoeken(self, organisatie_id):
        result = self.cursor.execute(
            "SELECT onderzoeken.titel,onderzoeken.status,onderzoeken.beschikbaar,onderzoeken.leeftijd_van,onderzoeken.leeftijd_tot,GROUP_CONCAT(alle_beperkingen.naam,',') AS beperking FROM onderzoeken JOIN onderzoek_beperkingen ON onderzoeken.onderzoek_id = onderzoek_beperkingen.onderzoek_id JOIN alle_beperkingen ON onderzoek_beperkingen.beperking_id = alle_beperkingen.beperking_id WHERE onderzoeken.organisatie_id = ? GROUP BY onderzoeken.onderzoek_id",
            str(organisatie_id),
        ).fetchall()
        return result

    def get_last_onderzoek_id(self):
        result = self.cursor.execute(
            "SELECT max(onderzoek_id) FROM onderzoeken"
        ).fetchone()
        return result

    def insert_onderzoek_disability(self, onderzoek_id, disability_id):
        self.cursor.execute(
            "INSERT INTO onderzoek_beperkingen (onderzoek_id, beperking_id) VALUES (?, ?)",
            (onderzoek_id, disability_id),
        )
        self.con.commit()
        return True

    def update_onderzoek(
        self, title, beschrijving, datumvanaf, datumtot, onderzoek_id, organisatie_id
    ):
        self.cursor.execute(
            " UPDATE onderzoeken SET titel = ?, beschrijving = ?, datum_vanaf = ?,datum_tot = ? WHERE onderzoek_id = ? AND organisatie_id = ?",
            (title, beschrijving, datumvanaf, datumtot, onderzoek_id, organisatie_id),
        )
        self.con.commit()
        return True

    def get_all_disabilities(self):
        result = self.cursor.execute("SELECT * FROM alle_beperkingen").fetchall()
        return result

    def get_onderzoek(self, onderzoek_id):
        result = self.cursor.execute(
            "SELECT * FROM onderzoeken WHERE onderzoek_id = ?", (onderzoek_id,)
        ).fetchone()
        return result

    def get_users_by_onderzoek(self, onderzoek_id):
        result = self.cursor.execute(
            "SELECT ervaringsdeskundigen.* FROM inschrijvingen JOIN ervaringsdeskundigen ON inschrijvingen.ervaringsdeskundige_id = ervaringsdeskundigen.ervaringsdeskundige_id WHERE inschrijvingen.onderzoek_id = ?",
            (onderzoek_id,),
        ).fetchall()
        return result

    def update_onderzoek_status(self, onderzoek_id, status):
        self.cursor.execute(
            "UPDATE onderzoeken SET status = ? WHERE onderzoek_id = ?",
            (status, onderzoek_id),
        )
        self.con.commit()
        return True
