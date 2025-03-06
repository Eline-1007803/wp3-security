import sqlite3
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

    def save_signup(self, fname, lname, zipcode):
        result = self.cursor.execute('''INSERT INTO ervaringsdeskundigen (voornaam, tussenvoegsel, achternaam, postcode) VALUES (?, ?, ?, ?)''', (fname, lname, zipcode))
        self.con.commit()
        return result

