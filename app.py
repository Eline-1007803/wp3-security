from flask import Flask, request, jsonify, render_template

from lib.model.administrators import Administrator
app = Flask(__name__)


@app.route("/", methods=["GET"])
def test():
    if request.method == "GET":
        return jsonify({"response":"hallo"})

@app.route("/api/administrators", methods=["GET"])
def get_all_administrators():
    administrator_model = Administrator()
    administrators = administrator_model.get_all_administrators()
    return administrators

@app.route("/api/administrator/<administrator_id>", methods=["GET"])
def get_administrator_by_id(administrator_id):
    administrator_model = Administrator()
    administrator = administrator_model.get_administrator_by_id(administrator_id)
    return administrator

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
def ey_administrator(administrator_id):
    voornaam = request.json["voornaam"]
    achternaam = request.json["achternaam"]
    administrator_model = Administrator()
    updated_administrator = administrator_model.update_administrator(voornaam, achternaam, administrator_id)
    print(updated_administrator)
    return updated_administrator


@app.route("/administrator-overview", methods=["GET"])
def administrator_page():
    return render_template("administrators-overview.html")


def aueia():
    admin = request.json


if __name__ == '__main__':
    app.run(debug=True)

