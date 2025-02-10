from flask import *
app = Flask(__name__)
app.secret_key = "wp3"

@app.route('/dashboard')
def dashboard():
    return render_template('beheerders_dashboard.html')


if __name__ == '__main__':
    app.run(debug=True)
