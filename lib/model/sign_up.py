import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


class Database(object):
    def __init__(self, path):
        self.path = path

    def connect_db(self):
        con = sqlite3.connect(
            self.path, check_same_thread=False
        )
        con.row_factory = sqlite3.Row
        cursor = con.cursor()
        return cursor, con

class SignUp():
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def save_signup(self, expert):
        result = self.cursor.execute('''INSERT INTO ervaringsdeskundigen (voornaam, tussenvoegsel, achternaam, wachtwoord, postcode, geslacht, emailadres, telefoonnummer, geboortedatum, hulpmiddelen, introductie, bijzonderheden, akkoord_met_voorwaarde, toezichthouder, naam_voogd, telefoonnummer_voogd, email_voogd, voorkeur_benadering, type_onderzoek, beschikbaarheid) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (expert['fname'], expert['infix'], expert['lname'], generate_password_hash(expert['password']), expert['zipcode'], expert['gender'], expert['email'], expert['phonenum'], expert['birthdate'], expert['tools'], expert['introduction'], expert['details'], expert['agreement_terms'], expert['supervisor'], expert['name_supervisor'], expert['phonenum_supervisor'], expert['email_supervisor'], expert['preferred_approach'], expert['research_type'], expert['availability']))

        expert_id = self.cursor.lastrowid
        disabilities = expert['disabilities']
        for disability in disabilities:
           self.cursor.execute('''INSERT INTO geregistreerde_beperkingen (ervaringsdeskundige_id, beperking_id) VALUES(?, ?)''', (expert_id, disability))



        self.con.commit()
        return result

    def save_disabilities(self):
        result = self.cursor.execute('''INSERT INTO geregistreerde_beperkingen (ervaringsdeskundige_id=last_insert_rowid(), beperking_id)''')
        return result


    def get_all_disabilities(self):
        result = self.cursor.execute('''SELECT * FROM alle_beperkingen''').fetchall()
        disabilities = []
        for row in result:
            disabilities.append(dict(row))
        return disabilities


