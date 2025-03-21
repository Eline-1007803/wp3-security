function get_organisatie_id(){
    fetch('/get_organisatie_id')
        .then(response => response.json())
        .then(get_user_info);
}

function get_user_info(id){
    let organisatie_id = id.id
    fetch(`/api/organisatie/${organisatie_id}`)
        .then(response => response.json())
        .then(fill_html)
}

function fill_html(organisatie_info){
    let name = document.getElementById('info');
    name.innerHTML = '';

    name.innerHTML = `
    <h1>Welcome ${organisatie_info.naam}</h1>
    <h2>Pas hier je organisatie gegevens aan:</h2><br>
    <p>Naam: ${organisatie_info.naam}</p>
    <p>Email: ${organisatie_info.email}</p>
    <p>Telfoonnummer: ${organisatie_info.telefoonnummer}</p>
    <label for="voornaam">Voornaam:</label>
    <input placeholder="voornaam" id="voornaam">
    <label for="tussenvoegsel">Tussenvoegsel:</label>
    <input placeholder="tussenvoegsel" id="tussenvoegsel">
    <label for="achternaam">Achternaam:</label>
    <input placeholder="achternaam" id="achternaam">
    <br>
    <label for="password">Wachtwoord:</label>
    <input type="password" placeholder="password" id="password">
    <label for="confirm_password">Bevestig wachtwoord:</label>
    <input type="password" placeholder="confrim password" id="confirm_password">
    <br>
    <label for="email">Email:</label>
    <input type="email" placeholder="email" id="email">
    <br>
    <label for="telefoonnummer">Telefoonnummer:</label>
    <input placeholder="telefoonnummer" id="telefoonnummer">
    <button id="save">Save</button>
    `;
}

function removelistener(){
    let save_button = document.getElementById('save')
    save_button.removeEventListener('click', () => {})
}

get_user_id()