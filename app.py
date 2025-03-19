from datetime import datetime, timedelta
from flask import *
import re,random,string
from lib.model.administrators import Administrator
from lib.model.sign_up import SignUp
from models.ervaringsdeskundigen_model import Ervaringsdeskundigen
from models.onderzoeken_model import Onderzoeken

from models import (
    ervaringsdeskundigen_model,
    inschrijvingen_model,
    onderzoeken_model,
    organisatie_model,
)

app = Flask(__name__)
app.secret_key = "wp3"

app.jinja_env.autoescape = True


open_routes = ['login_page', 'login']
admin_routes = ['dashboard', 'administrator_page']
expert_routes = ['openstaande_onderzoeken', 'lijst_ingeschreven_onderzoeken']

@app.before_request
def before_request():
    if request.endpoint in open_routes:
        return

    if request.endpoint in admin_routes and not session.get('admin'):
        return redirect(url_for('index'))

    if request.endpoint in expert_routes and not session.get('expert'):
        return redirect(url_for('index'))


@app.route('/', methods=['GET'])
def index():
    if session.get('expert'):
        return redirect(url_for('onderzoeken_pagina'))

    if session.get('admin'):
        return redirect(url_for('dashboard'))

    return redirect(url_for('login_page'))



@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    print(request.json)
    expert_model = Ervaringsdeskundigen()
    expert = expert_model.authentication_expert(email, password)
    if expert:
        print("yess")
        session['expert'] = expert
        return {"message": "Login successful", "success": True}

    admin_model = Administrator()
    admin = admin_model.get_administrator_login(email, password)

    if admin:
        session['admin'] = admin
        return {"message": "Login successful", "success": True}

    else:
        print("no")
        return {"message": "Login failed", "success": False}


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page'))

@app.route("/api/administrators", methods=["GET"])
def get_all_administrators():
    administrator_model = Administrator()
    administrators = administrator_model.get_all_administrators()
    return jsonify(administrators)


@app.route("/api/administrator/<administrator_id>", methods=["GET"])
def get_administrator_by_id(administrator_id):
    administrator_model = Administrator()
    administrator = administrator_model.get_administrator_by_id(administrator_id)
    print(administrator)
    return jsonify(administrator)


@app.route("/api/new-administrator", methods=["POST"])
def add_administrator():
    fname = request.json["fname"]
    lname = request.json["lname"]
    email = request.json["email"]
    print(request.json)
    administrator_model = Administrator()
    new_administrator = administrator_model.add_administrator(fname, lname, email)
    return new_administrator, 201


@app.route("/api/administrator/<administrator_id>", methods=["PATCH"])
def update_administrator(administrator_id):
    fname = request.json["voornaam"]
    lname = request.json["achternaam"]
    email = request.json["email"]
    administrator_model = Administrator()
    updated_administrator = administrator_model.update_administrator(fname, lname, email, administrator_id)
    print(updated_administrator)
    return updated_administrator


@app.route("/api/administrator/<administrator_id>", methods=["DELETE"])
def delete_administrator(administrator_id):
    administrator_model = Administrator()
    deleted_administrator = administrator_model.delete_administrator(administrator_id)
    print(deleted_administrator)
    return jsonify("hallo")


@app.route("/administrator-overview", methods=["GET"])
def administrator_page():
    administrator_model = Administrator()
    administrators = administrator_model.get_all_administrators()
    return render_template("administrators-overview.html")


@app.route("/expert-sign-up")
def expert_sign_up():
    return render_template("sign-up-page.html")

@app.route('/api/beperkingen-ophalen', methods=["GET"])
def get_disabilities():
    sign_up_model = SignUp()
    disabilities = sign_up_model.get_all_disabilities()
    return jsonify(disabilities)

# @app.route('/api/beperkingen-opslaan', methods=["POST"])
# def save_disabilities():
#     sign_up_model = SignUp()
#     disabilities = sign_up_model.save_disabilities()
#     return jsonify(disabilities)
@app.route("/api/save-signup", methods=["POST"])
def save_sign_up():

    new_expert = request.get_json()
    print(new_expert)
    signup_model = SignUp()
    save_sign_up = signup_model.save_signup(new_expert)
    return save_sign_up


@app.route("/dashboard")
def dashboard():
    return render_template("beheerders_dashboard.html")


@app.route("/api/deskundigen", methods=["GET"])
def get_deskundigen():
    edm = ervaringsdeskundigen_model.Ervaringsdeskundigen()
    result = edm.get_all_pending()
    dictresult = []
    for row in result:
        corresponding_beperkingen = edm.get_corresponding_beperkingen(row["ervaringsdeskundige_id"])
        row_dict = dict(row)
        beperkingen_str = ''
        first = 0
        for rows in corresponding_beperkingen:
            if first == 0:
                beperkingen_str += rows["naam"]
                first = 1
            else:
                beperkingen_str += ', ' + rows["naam"]
        row_dict["naam"] = beperkingen_str
        dictresult.append(row_dict)
    return {"deskundigen": dictresult}


@app.route("/api/deskundigen", methods=["PUT"])
def update_deskundigen():
    edm = ervaringsdeskundigen_model.Ervaringsdeskundigen()
    status = request.json.get("status")
    deskundige_id = request.json.get("id")
    edm.update_status(deskundige_id, status)
    return "200"

@app.route("/api/inschrijvingen", methods=["GET"])
def get_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    result = ism.get_all_pending()
    dictresult = []
    for row in result:
        ev_corresponding_beperkingen, on_corresponding_beperkingen = ism.get_corresponding_beperkingen(row["ervaringsdeskundige_id"], row["onderzoek_id"])
        row_dict = dict(row)
        beperkingen_str = ''
        first = 0
        for rows in ev_corresponding_beperkingen:
            if first == 0:
                beperkingen_str += rows["ev_bep_naam"]
                first = 1
            else:
                beperkingen_str += ', ' + rows["ev_bep_naam"]
        row_dict["ev_bep_naam"] = beperkingen_str
        beperkingen_str = ''
        first = 0
        for rows in on_corresponding_beperkingen:
            if first == 0:
                beperkingen_str += rows["on_bep_naam"]
                first = 1
            else:
                beperkingen_str += ', ' + rows["on_bep_naam"]
        row_dict["on_bep_naam"] = beperkingen_str
        dictresult.append(row_dict)
    return {"inschrijvingen": dictresult}


@app.route("/api/inschrijvingen", methods=["PUT"])
def update_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    status = request.json.get("status")
    inschrijving_id = request.json.get("id")
    ism.update_status(inschrijving_id, status)
    return "200"

@app.route("/api/onderzoeken", methods=["GET"])
def get_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    result = ozm.get_all_pending()
    dictresult = []
    for row in result:
        corresponding_beperkingen = ozm.get_corresponding_beperkingen(row["onderzoek_id"])
        row_dict = dict(row)
        beperkingen_str = ''
        first = 0
        for rows in corresponding_beperkingen:
            if first == 0:
                beperkingen_str += rows["bep_naam"]
                first = 1
            else:
                beperkingen_str += ', ' + rows["bep_naam"]
        row_dict["bep_naam"] = beperkingen_str
        dictresult.append(row_dict)
    return {"onderzoeken": dictresult}


@app.route("/api/alle_beperkingen", methods=["GET"])
def beperkingen():
    result = organisatie.get_all_disabilities()
    beperkingen = []
    for row in result:
        beperkingen.append(dict(row))
    return jsonify(beperkingen)

@app.route("/api/overzicht_organisaties", methods=["GET"])
def overzicht_organisaties():
    return render_template("all_organisaties.html")

@app.route("/api/organisatie_aanmaken", methods=["GET"])
def organisatie_aanmaken():
    return render_template("organisatie_aanmaken.html")

@app.route("/api/alle_organisaties", methods=["GET"])
def organisaties():
    result = organisatie.get_all_organisaties()
    return jsonify(result)

@app.route("/api/alle_organisaties/delete=<organisatie_id>", methods=["DELETE"])
def delete_organisatie(organisatie_id):
    result = organisatie.delete_organisatie(organisatie_id)
    return jsonify(result)


# dit regex variable is om te checken of het email is.
regex_email = r"^\S+@\S+\.\S+$"
# dit regex variable is om te checken of het website is.
regex_website = "^[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$"

@app.route("/api/organisatie_aanmaken/new", methods=["POST"])
def nieuwe_organisatie():
    naam = request.json["naam"]
    if naam == "":
        return jsonify("Typ organisatie naam in!"), 400
    option = request.json["option"]
    if option != "non-profit" and option != "commercieel":
        return (
            jsonify(
                "Kies het type organisatie type! \nTip: het is of (non-profit) of (commercieel)"
            ),
            400,
        )
    website = request.json["website"]
    if not re.match(regex_website, website):
        return jsonify("Voer een goede website adres in!"), 400
    beschrijving = request.json["beschrijving"]
    if beschrijving == "":
        return jsonify("Voer beschrijving in"), 400
    contactpersoon = request.json["contactpersoon"]
    if contactpersoon == "":
        return jsonify("Voer naam van de contact persoon in in"), 400
    email = request.json["email"]
    if not re.match(regex_email, email):
        return jsonify("Voer een goede email adres in!"), 400
    number = request.json["number"]
    check_number_10_digit = str(number)
    if not isinstance(number, int) or len(check_number_10_digit) != 10:
        return jsonify("U heeft geen nummer ingevuld of het heeft geen 10 cijfers"), 400
    overige_details = request.json["overige_details"]
    api_key = ''.join(random.choices(string.ascii_letters + string.digits + string.punctuation, k=32))
    new_organisatie = organisatie.organisatie_aanmaaken(
        naam,
        option,
        website,
        beschrijving,
        contactpersoon,
        email,
        number,
        overige_details,
        api_key,
    )
    return jsonify(new_organisatie), 201


@app.route("/api/overzicht_onderzoeken", methods=["GET"])
def overzicht_onderzoeken():
    return render_template("overzicht_onderzoeken.html")

@app.route("/api/overzicht_onderzoeken_organisatie", methods=["GET"])
def overzicht_onderzoeken_organisatie():
    organisatie_id = 1  # for now
    onderzoek = organisatie.get_all_onderzoeken(organisatie_id)
    onderzoeken = []
    for row in onderzoek:
        onderzoeken.append(dict(row))
    return jsonify(onderzoeken)

@app.route("/api/overzicht_onderzoeken_organisatie/<onderzoek_id>", methods=["GET"])
def get_onderzoek(onderzoek_id):
    onderzoek = organisatie.get_onderzoek(onderzoek_id)
    return jsonify(onderzoek), 200

@app.route("/api/overzicht_onderzoeken_organisatie/<onderzoek_id>", methods=["PATCH"])
def update_status(onderzoek_id):
    status = request.json["status"]
    onderzoek = organisatie.update_onderzoek_status(onderzoek_id, status)
    return jsonify(onderzoek), 200


@app.route(
    "/api/overzicht_onderzoeken_organisatie/update=<onderzoek_id>", methods=["PATCH"]
)
def update_onderzoek_gegevens(onderzoek_id):
    title = request.json["titel"]
    if title == "":
        return jsonify("Title can't be empty!"), 400

    beschrijving = request.json["beschrijving"]
    if beschrijving == "":
        return jsonify("Beschrijving can't be empty!"), 400

    datum_vanaf = request.json["datumvanaf"]
    date_vanaf = datetime.strptime(datum_vanaf, "%Y-%m-%d")
    if datum_vanaf == "" or date_vanaf < datetime.now()- timedelta(days=1):
        return jsonify("You have not chosen a date from or chosen a past date."), 400

    datum_tot = request.json["datumtot"]
    date_tot = datetime.strptime(datum_tot, "%Y-%m-%d")
    if datum_tot == "" or date_tot < date_vanaf:
        return (
            jsonify(
                "You have not chosen a date till or chosen a date before date from"
            ),
            400,
        )

    organisatie_id = 1  # for now
    updated_onderzoek_gegevens = organisatie.update_onderzoek(
        title, beschrijving, datum_vanaf, datum_tot, onderzoek_id, organisatie_id
    )
    return jsonify(updated_onderzoek_gegevens), 200


@app.route(
    "/api/overzicht_onderzoeken_organisatie/<onderzoek_id>/users", methods=["GET"]
)
def ingeschreven_users_onderzoekid(onderzoek_id):
    onderzoek = organisatie.get_users_by_onderzoek(onderzoek_id)
    onderzoeken = []
    for row in onderzoek:
        onderzoeken.append(dict(row))
    return jsonify(onderzoeken)


@app.route("/api/onderzoeken", methods=["PUT"])
def update_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    status = request.json.get("status")
    onderzoek_id = request.json.get("id")
    ozm.update_status(onderzoek_id, status)
    return "200"



@app.route("/onderzoekaanvragen", methods=["GET"])
def onderzoek_pagina():
    return render_template("onderzoek_aanvraag__organisatie.html")


@app.route("/api/onderzoekaanvragen", methods=["POST"])
def onderzoek_aanvragen_organisatie():
    title = request.json["titel"]
    if title == "":
        return jsonify("Titel can't be empty!"), 400

    beschrijving = request.json["beschrijving"]
    if beschrijving == "":
        return jsonify("Beschrijving can't be empty!"), 400

    datum_vanaf = request.json["datumvanaf"]
    if datum_vanaf == "":
        return jsonify("You must select a date from"), 400

    date_vanaf = datetime.strptime(datum_vanaf, "%Y-%m-%d")
    if date_vanaf < datetime.now()- timedelta(days=1):
        return jsonify("You have chosen a past date."), 400

    datum_tot = request.json["datumtot"]
    if datum_tot == "":
        return jsonify("You must select a date till"), 400

    date_tot = datetime.strptime(datum_tot, "%Y-%m-%d")
    if date_tot < date_vanaf:
        return jsonify("You have chosen a date before date from"), 400
    time_slot = request.json["tijd"]
    if time_slot == "":
        return jsonify('Time slot cant be empty!\nTip: voeg het tijd in als string bijv ("13:00")'), 400

    type_onderzoek = request.json["typeonderzoek"]
    if type_onderzoek == "":
        return jsonify("Kies het type onderzoek!\nLocatie/Telefonisch/Online"),400
    locatie = request.json["locatie_text"]
    if type_onderzoek == "locatie":
        if locatie == "":
            return jsonify("Typ hier de locatie!"), 400
    locatie = request.json["locatie_text"]
    met_beloning = request.json["metbeloning"]
    hoeveel_beloning = request.json["beloning"]
    if met_beloning == "1" or met_beloning == 1:
        if hoeveel_beloning == "":
            return jsonify("U heeft geen beloning getypt."), 400
    if met_beloning == "0" or met_beloning == 0:
        if len(hoeveel_beloning)>0:
            return jsonify("u heeft vergoeding niet geselecteerd"),400
    type_disability = request.json["disability-type-input"]
    if not isinstance(type_disability, list):
        return (
            jsonify(
                "Voeg beperking(en) in een list! \nTip: bij /api/alle_beperkingen kan je id's vinden van alle beperkingen"
            ),
            400,
        )

    leeftijd_van = request.json["leeftijdvan"]
    if leeftijd_van == "" and not isinstance(leeftijd_van,int):
        return jsonify("Je hebt geen leeftijd ingevoerd"), 400

    leeftijd_tot = request.json["leeftijdtot"]
    if leeftijd_tot == "" and not isinstance(leeftijd_van,int):
        return jsonify("Kies leeftijd tot!"), 400

    if met_beloning == "on":
        met_beloning = 1
    else:
        met_beloning = 0
    organisatie_id = 1  # for now
    onderzoek = organisatie.insert_onderzoek(
        title,
        beschrijving,
        time_slot,
        datum_vanaf,
        datum_tot,
        type_onderzoek,
        locatie,
        met_beloning,
        hoeveel_beloning,
        leeftijd_van,
        leeftijd_tot,
        organisatie_id,
    )
    onderzoek_id_opvragen = organisatie.get_last_onderzoek_id()
    onderzoek_id = int(onderzoek_id_opvragen[0])
    for disability in type_disability:
        organisatie.insert_onderzoek_disability(onderzoek_id, disability)
    return jsonify(onderzoek), 201


@app.route("/api/openstaande_onderzoeken", methods=["GET"])
def get_open_research():
    onderzoeken_model = Onderzoeken()
    open_onderzoeken = onderzoeken_model.get_open_research()

    return jsonify(open_onderzoeken)
#render_template('ervaringsdeskundige_onderzoeken.html', open_onderzoeken=open_onderzoeken)


@app.route("/openstaande_onderzoeken")
def onderzoeken_pagina():
    return render_template("ervaringsdeskundige_onderzoeken.html")


#@app.route('/openstaande_onderzoeken', methods=['POST'])
#def 


@app.route("/api/ingeschreven_onderzoeken", methods=["GET"])
def get_signedup_research():
    onderzoeken_model = Onderzoeken()
    ervaringsdeskundige_id = 1  # moet nog worden veranderd
    ingeschreven_onderzoeken = onderzoeken_model.get_signedup_research(
        ervaringsdeskundige_id
    )

    return jsonify(ingeschreven_onderzoeken)


@app.route("/ingeschreven_onderzoeken")
def lijst_ingeschreven_onderzoeken():
    return render_template("list_research.html")


if __name__ == "__main__":
    organisatie = organisatie_model.Organisatie()
    app.run(debug=True)
