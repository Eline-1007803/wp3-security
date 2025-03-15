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

    def save_signup(self, fname, infix, lname, password, zipcode, gender, email, phonenum, birthdate, tools, introduction, details, agreement_terms, supervisor, name_supervisor, phonenum_supervisor, email_supervisor, preferred_approach, research_type, availability):
        result = self.cursor.execute('''INSERT INTO ervaringsdeskundigen (voornaam, tussenvoegsel, achternaam, wachtwoord, postcode, geslacht, emailadres, telefoonnummer, geboortedatum, hulpmiddelen, introductie, bijzonderheden, akkoord_met_voorwaarde, toezichthouder, naam_voogd, telefoonnummer_voogd, email_voogd, voorkeur_benadering, type_onderzoek, beschikbaarheid) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (fname, infix, lname, generate_password_hash(password), zipcode, gender, email, phonenum, birthdate, tools, introduction, details, agreement_terms, supervisor, name_supervisor, phonenum_supervisor, email_supervisor, preferred_approach, research_type, availability))
        self.con.commit()
        return result

