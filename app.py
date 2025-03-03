from flask import Flask, request, jsonify, render_template

from lib.model.administrators import Administrator
app = Flask(__name__)
from models import ervaringsdeskundigen_model, inschrijvingen_model, onderzoeken_model,organisatie_model

app = Flask(__name__)
app.secret_key = "wp3"

@app.route("/", methods=["GET"])
def test():
    if request.method == "GET":
        return jsonify({"response":"hallo"})

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
    voornaam = request.json["voornaam"]
    achternaam = request.json["achternaam"]
    email = request.json["email"]
    administrator_model = Administrator()
    updated_administrator = administrator_model.update_administrator(voornaam, achternaam, email, administrator_id)
    print(updated_administrator)
    return updated_administrator


@app.route("/administrator-overview", methods=["GET"])
def administrator_page():
    administrator_model = Administrator()
    administrators = administrator_model.get_all_administrators()
    return render_template("administrators-overview.html", administrators=administrators)

@app.route("/expert-sign-up")
def expert_sign_up():
    return render_template("sign-up-page.html")

@app.route('/dashboard')
def dashboard():
    return render_template('beheerders_dashboard.html')

@app.route('/api/deskundigen', methods=['GET'])
def get_deskundigen():
    edm = ervaringsdeskundigen_model.Ervaringsdeskundigen()
    result = edm.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"deskundigen": dictresult}

@app.route('/api/inschrijvingen', methods=['GET'])
def get_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    result = ism.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"inschrijvingen": dictresult}

@app.route('/api/onderzoeken', methods=['GET'])
def get_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    result = ozm.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"onderzoeken": dictresult}


@app.route("/onderzoekaanvragen",methods=["GET"])
def onderzoek_pagina():
    return render_template("onderzoek_aanvraag__organisatie.html")

@app.route("/api/onderzoekaanvragen",methods=["POST"])
def onderzoek_aanvragen_organisatie():
    title = request.json["titel"]
    if title == "":
        return jsonify("Titel can't be empty!"),400

    beschrijving = request.json["beschrijving"]
    if beschrijving == "":
        return jsonify("Beschhijving can't be empty!"),400

    datum_vanaf = request.json["datumvanaf"]
    if datum_vanaf == "":
        return jsonify("Datum vanaf cant be empty!"),400

    datum_tot = request.json["datumtot"]
    if datum_tot == "":
        return jsonify("Datum tot cant be empty!"),400

    type_onderzoek = request.json["typeonderzoek"]
    if type_onderzoek == "":
        return jsonify("Kies type onderzoek!"),400

    locatie = request.json["locatie_text"]
    met_beloning = request.json["metbeloning"]
    hoeveel_beloning = request.json["beloning"]
    type_disability = request.json["disability-type-input"]
    if type_disability == "":
        return jsonify("Kies beperking!"),400

    leeftijd_van = request.json["leeftijdvan"]
    if leeftijd_van == "":
        return jsonify("Kies leeftijd van!"),400

    leeftijd_tot = request.json["leeftijdtot"]
    if leeftijd_tot == "":
        return jsonify("Kies leeftijd tot!"),400

    if met_beloning == "on":
        met_beloning = 1
    else:
        met_beloning = 0
    organisatie_id = 1 #for now
    onderzoek = organisatie.insert_onderzoek(title,beschrijving,datum_vanaf,datum_tot,type_onderzoek,locatie,met_beloning,hoeveel_beloning,leeftijd_van,leeftijd_tot,organisatie_id)
    onderzoek_id_opvragen = organisatie.get_last_onderzoek_id()
    onderzoek_id = int(onderzoek_id_opvragen[0])
    for disability in type_disability:
        organisatie.insert_onderzoek_disability(onderzoek_id, disability)
    return jsonify(onderzoek), 201



if __name__ == '__main__':
    organisatie = organisatie_model.Organisatie()
    app.run(debug=True)
