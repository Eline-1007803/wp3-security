from datetime import datetime
from flask import *
from flask import Flask, request, jsonify, render_template
from lib.model.administrators import Administrator
from lib.model.sign_up import SignUp


app = Flask(__name__)
from models import (
    ervaringsdeskundigen_model,
    inschrijvingen_model,
    onderzoeken_model,
    organisatie_model,
)

app = Flask(__name__)
app.secret_key = "wp3"


@app.route("/", methods=["GET"])
def test():
    if request.method == "GET":
        return jsonify({"response": "hallo"})


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
    updated_administrator = administrator_model.update_administrator(
        voornaam, achternaam, email, administrator_id
    )

    updated_administrator = administrator_model.update_administrator(fname, lname, email)

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


@app.route("/api/save-signup", methods=["POST"])
def save_sign_up():
    fname = request.json["fname"]
    infix = request.json["infix"]
    lname = request.json["lname"]
    password = request.json["password"]
    zipcode = request.json["zipcode"]
    gender = request.json["gender"]
    email = request.json["email"]
    phonenum = request.json["phonenum"]
    birthdate = request.json["birthdate"]
    tools = request.json["tools"]
    introduction = request.json["introduction"]
    details = request.json["details"]
    agreement_terms = request.json["agreement_terms"]
    supervisor = request.json["supervisor"]
    name_supervisor = request.json["name_supervisor"]
    phonenum_supervisor = request.json["phonenum_supervisor"]
    email_supervisor= request.json["email_parent"]
    preferred_approach = request.json["preferred_approach"]
    research_type = request.json["research_type"]
    availability = request.json["availability"]
    status = request.json["status"]
    color_foreground = request.json["color_foreground"]
    color_background = request.json["color_background"]


    signup_model = SignUp()
    save_sign_up = signup_model.save_signup(fname, infix, lname, password, zipcode, gender, email, phonenum, birthdate, tools, introduction, details, agreement_terms, supervisor, name_supervisor, phonenum_supervisor, email_supervisor, preferred_approach, research_type, availability, status, color_foreground, color_background )
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
        dictresult.append(dict(row))
    return {"deskundigen": dictresult}


@app.route("/api/inschrijvingen", methods=["GET"])
def get_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    result = ism.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"inschrijvingen": dictresult}


@app.route("/api/onderzoeken", methods=["GET"])
def get_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    result = ozm.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"onderzoeken": dictresult}


@app.route("/api/overzicht_onderzoeken", methods=["GET"])
def overzicht_onderzoeken():
    organisatie_id = 1  # for now
    onderzoeken = organisatie.get_all_onderzoeken(organisatie_id)
    return render_template("overzicht_onderzoeken.html", onderzoeken=onderzoeken)


@app.route("/api/overzicht_onderzoeken/<onderzoek_id>", methods=["PATCH"])
def update_onderzoek_gegevens(onderzoek_id):
    title = request.json["titel"]
    if title == "":
        return jsonify("Title can't be empty!"), 400

    beschrijving = request.json["beschrijving"]
    if beschrijving == "":
        return jsonify("Beschrijving can't be empty!"), 400

    datum_vanaf = request.json["datumvanaf"]
    date_vanaf = datetime.strptime(datum_vanaf, "%Y-%m-%d")
    if datum_vanaf == "" or date_vanaf < datetime.now():
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
    date_vanaf = datetime.strptime(datum_vanaf, "%Y-%m-%d")
    if datum_vanaf == "" or date_vanaf < datetime.now():
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

    if datum_vanaf == "":
        return jsonify("Datum vanaf cant be empty!"), 400

    datum_tot = request.json["datumtot"]
    if datum_tot == "":
        return jsonify("Datum tot cant be empty!"), 400

    type_onderzoek = request.json["typeonderzoek"]
    if type_onderzoek == "locatie":
            if locatie == "":
                return jsonify("Typ hier de locatie!"),400
            
    locatie = request.json["locatie_text"]
    met_beloning = request.json["metbeloning"]
    hoeveel_beloning = request.json["beloning"]
    if met_beloning == "1":
        if hoeveel_beloning == "":
            return jsonify("U heeft geen beloning getypt."),400
    type_disability = request.json["disability-type-input"]
    if not isinstance(type_disability, list):
        return jsonify("Voeg beperking(en) in een list!!"), 400

    leeftijd_van = request.json["leeftijdvan"]
    if leeftijd_van == "":
        return jsonify("Je hebt geen leeftijd ingevoerd"), 400

    leeftijd_tot = request.json["leeftijdtot"]
    if leeftijd_tot == "":
        return jsonify("Kies leeftijd tot!"), 400

    if met_beloning == "on":
        met_beloning = 1
    else:
        met_beloning = 0
    organisatie_id = 1  # for now
    onderzoek = organisatie.insert_onderzoek(
        title,
        beschrijving,
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


if __name__ == "__main__":
    organisatie = organisatie_model.Organisatie()
    app.run(debug=True)
