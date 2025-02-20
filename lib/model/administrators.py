import sqlite3

class Database(object):
    def __init__(self, path):
        self.path = path  # Ask for the database file path whenever Database() is called

    def connect_db(self):
        con = sqlite3.connect(
            self.path, check_same_thread=False
        )  # Make a connection with the database stored in path
        con.row_factory = sqlite3.Row  # Save results in rows instead of a tuple
        cursor = con.cursor()  # Cursor for executing SQL statements
        return cursor, con  # Return the cursor and the db connection



class Administrator():
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_administrators(self):
        result = self.cursor.execute('''SELECT voornaam, tussenvoegsel, achternaam, email FROM beheerders''').fetchall()
        administrators = []
        for row in result:
            administrators.append(dict(row))
        return administrators

    def get_administrator_by_id(self, administrator_id):
        result = self.cursor.execute('''SELECT beheerder_id, voornaam, tussenvoegsel, achternaam, email FROM beheerders WHERE beheerder_id = ?''', (administrator_id,)).fetchone()
        if result:
            print(result)
            return dict(result)

    def add_administrator(self, fname, lname, email):
        result = self.cursor.execute('''INSERT INTO beheerders (voornaam, achternaam, email) VALUES (?, ?, ?)''', (fname, lname, email))
        self.con.commit()
        print(result)
        return dict(result)

    def update_administrator(self, voornaam, achternaam, administrator_id):
        result = self.cursor.execute('''UPDATE beheerders SET voornaam = ?, achternaam = ? WHERE beheerder_id = ? ''', (voornaam, achternaam, administrator_id))
        self.con.commit()
        print(voornaam, achternaam)
        print(result)
        return dict(result)





