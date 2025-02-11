from flask import *
from models import ervaringsdeskundigen_model

app = Flask(__name__)
app.secret_key = "wp3"

@app.route('/dashboard')
def dashboard():
    return render_template('beheerders_dashboard.html')

@app.route('/api/deskundigen')
def get_deskundigen():
    edm = ervaringsdeskundigen_model.Ervaringsdeskundigen()
    result = edm.get_all_pending()
    dictresult = []
    for row in result:
        dictresult.append(dict(row))
    return {"deskundigen": dictresult}


if __name__ == '__main__':
    app.run(debug=True)
