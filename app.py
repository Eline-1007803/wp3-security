from datetime import datetime
from flask import *
app = Flask(__name__)
from models import ervaringsdeskundigen_model, inschrijvingen_model, onderzoeken_model,organisatie_model

app = Flask(__name__)
app.secret_key = "wp3"

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


@app.route("/api/overzicht_onderzoeken/<onderzoek_id>",methods=["PATCH"])
def update_onderzoek_gegevens(onderzoek_id):
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
    
    updated_onderzoek_gegevens = organisatie.update_onderzoek(title,beschrijving,datum_vanaf,datum_tot,onderzoek_id)
    return jsonify(updated_onderzoek_gegevens),200


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
    date_vanaf = datetime.strptime(datum_vanaf,"%Y-%m-%d")
    if datum_vanaf == "" or date_vanaf < datetime.now():
        return jsonify("You have not chosen a date from or chosen a past date."),400
    
    datum_tot = request.json["datumtot"]
    date_tot = datetime.strptime(datum_tot,"%Y-%m-%d")
    if datum_tot == "" or date_tot < date_vanaf:
        return jsonify("You have not chosen a date till or chosen a date before date from"),400
    
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
        return jsonify("Je hebt geen leeftijd ingevoerd"),400
    
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
