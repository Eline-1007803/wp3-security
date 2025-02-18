from flask import *
from models import ervaringsdeskundigen_model, inschrijvingen_model, onderzoeken_model

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
    return {"inschrijvingen": dictresult}


if __name__ == '__main__':
    app.run(debug=True)
