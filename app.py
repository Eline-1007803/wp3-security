from flask import *
app = Flask(__name__)
from models.organisatie_model import Organisatie

@app.route('/')
def homepage():
    return "hello"


@app.route("/api/onderzoekaanvragen",methods=["GET"])
def onderzoek_pagina():
    return render_template("onderzoek_aanvraag__organisatie.html")

@app.route("/api/onderzoekaanvragen",methods=["POST"])
def onderzoek_aanvragen_organisatie():
    title = request.json["titel"]
    beschrijving = request.json["beschrijving"]
    datum_vanaf = request.json["datumvanaf"]
    datum_tot = request.json["datumtot"]
    type_onderzoek = request.json["typeonderzoek"]
    locatie = request.json["locatie_text"]
    met_beloning = request.json["metbeloning"]
    hoeveel_beloning = request.json["beloning"]
    type_disability = request.json["disability-type-input"]
    leeftijd_van = request.json["leeftijdvan"]
    leeftijd_tot = request.json["leeftijdtot"]
    if met_beloning == "on": 
        met_beloning = 1
    else:
        met_beloning = 0
    onderzoek = organisatie.insert_onderzoek(title,beschrijving,datum_vanaf,datum_tot,type_onderzoek,locatie,met_beloning,hoeveel_beloning,leeftijd_van,leeftijd_tot,type_disability)
    return onderzoek, 201


if __name__ == '__main__':
    organisatie = Organisatie()
    app.run(debug=True)
