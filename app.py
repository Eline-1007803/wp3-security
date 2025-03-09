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

@app.route('/api/deskundigen', methods=['PUT'])
def update_deskundigen():
    edm = ervaringsdeskundigen_model.Ervaringsdeskundigen()
    status = request.json.get('status')
    deskundige_id = request.json.get('id')
    edm.update_status(deskundige_id, status)
    return "200"

@app.route('/api/inschrijvingen', methods=['GET'])
def get_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    result = ism.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"inschrijvingen": dictresult}

@app.route('/api/inschrijvingen', methods=['PUT'])
def update_inschrijvingen():
    ism = inschrijvingen_model.Inschrijvingen()
    status = request.json.get('status')
    inschrijving_id = request.json.get('id')
    ism.update_status(inschrijving_id, status)
    return "200"

@app.route('/api/onderzoeken', methods=['GET'])
def get_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    result = ozm.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"onderzoeken": dictresult}

@app.route('/api/onderzoeken', methods=['PUT'])
def update_onderzoeken():
    ozm = onderzoeken_model.Onderzoeken()
    status = request.json.get('status')
    onderzoek_id = request.json.get('id')
    ozm.update_status(onderzoek_id, status)
    return "200"


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
