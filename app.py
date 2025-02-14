from flask import *
app = Flask(__name__)
from models.organisatie_model import Organisatie

@app.route('/')
def homepage():
    return "hello"

@app.route("/api/onderzoekaanvragen",methods=["GET","POST"])
def onderzoek_aanvragen_organisatie():
    if request.method == "POST":
        title = request.form.get("titel")
        beschrijving = request.form.get("beschrijving")
        datum_vanaf = request.form.get("datumvanaf")
        datum_tot = request.form.get("datumtot")
        type_onderzoek = request.form.get("typeonderzoek")
        locatie = request.form.get("locatie_text")
        met_beloning = request.form.get("metbeloning",0)
        hoeveel_beloning = request.form.get("beloning")
        type_disability = request.form.get("disability-type-input")
        leeftijd_van = request.form.get("leeftijdvan")
        leeftijd_tot = request.form.get("leeftijdtot")
        if met_beloning == "on":
            met_beloning = 1
        else:
            met_beloning = 0
        onderzoek = organisatie.insert_onderzoek(title,beschrijving,datum_vanaf,datum_tot,type_onderzoek,locatie,met_beloning,hoeveel_beloning,leeftijd_van,leeftijd_tot,type_disability)
        return redirect(url_for("onderzoek_aanvragen_organisatie",onderzoek=onderzoek))
    return render_template("onderzoek_aanvraag__organisatie.html")

if __name__ == '__main__':
    organisatie = Organisatie()
    app.run(debug=True)
