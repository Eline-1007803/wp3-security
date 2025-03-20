import sqlite3

from werkzeug.security import generate_password_hash, check_password_hash


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



class Administrator:
    def __init__(self):
        database = Database("./databases/database.db")
        self.cursor, self.con = database.connect_db()

    def get_all_administrators(self):
        result = self.cursor.execute('''SELECT beheerder_id, voornaam, tussenvoegsel, achternaam, email FROM beheerders''').fetchall()
        administrators = []
        for row in result:
            administrators.append(dict(row))
        return administrators

    def get_administrator_by_id(self, administrator_id):
        result = self.cursor.execute('''SELECT *, voornaam || ' ' || coalesce(tussenvoegsel || ' ' || achternaam, achternaam) as volle_naam FROM beheerders WHERE beheerder_id = ?''', (administrator_id,)).fetchone()
        return dict(result)

    def get_administrator_login(self, email, password):
        result = self.cursor.execute('''SELECT beheerder_id, wachtwoord FROM beheerders WHERE email = ?''', (email,)).fetchone()
        if result:
            if check_password_hash(result['wachtwoord'], password):
                return result['beheerder_id']
        return None

    def add_administrator(self, fname, lname, email, password):
        result = self.cursor.execute('''INSERT INTO beheerders (voornaam, achternaam, email, wachtwoord) VALUES (?, ?, ?, ?)''', (fname, lname, email, generate_password_hash(password)))
        self.con.commit()
        print(result)
        return dict(result)

    def update_administrator(self, voornaam, achternaam, email, administrator_id):
        result = self.cursor.execute('''UPDATE beheerders SET voornaam = ?, achternaam = ?, email = ? WHERE beheerder_id = ? ''', (voornaam, achternaam, email, administrator_id))
        self.con.commit()
        print(voornaam, achternaam)
        print(result)
        return dict(result)

    def update_own_administrator(self, voornaam, tussenvoegsel, achternaam, wachtwoord, email, telefoonnummer, administrator_id):
        result = self.cursor.execute('''UPDATE beheerders SET voornaam = ?,tussenvoegsel = ?, achternaam = ?, wachtwoord = ?, email = ?, telefoonnummer = ? WHERE beheerder_id = ? ''', (voornaam, tussenvoegsel, achternaam, wachtwoord, email, telefoonnummer, administrator_id))
        self.con.commit()
        return dict(result)

    def delete_administrator(self, administrator_id):
        self.cursor.execute('''DELETE FROM beheerders WHERE beheerder_id = ? ''', (administrator_id,))
        self.con.commit()


