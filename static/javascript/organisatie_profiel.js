function get_organisatie_id(){
    fetch('/get_organisatie_id')
        .then(response => response.json())
        .then(get_user_info);
}

function get_user_info(id){
    let organisatie = id.organisatie_id
    fetch(`/api/organisatie/${organisatie}`)
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
    <p>Telefoonnummer: ${organisatie_info.telefoonnummer}</p>
    <label for="naam">Naam:</label>
    <input placeholder="naam" id="naam" value="${organisatie_info.naam}">
    <label for="wachtwoord">Wachtwoord:</label>
    <input name="wachtwoord" placeholder="wachwoord" id="wachtwoord" min="8">
    <select aria-label="selecteer type organisatie" name="select" id="select">
    <option disabled>Kies type organisatie</option>
    <option value="non-profit">Non-Profit</option>
    <option value="commercieel">Commercieel</option>
    <br>
    <label for="website">Website:</label><br>
    <input type="url" placeholder="website" id="url" value="${organisatie_info.website}">
    <label for="beschrijving">Beschrijving:</label>
    <textarea style="resize:none;">${organisatie_info.beschrijving}</textarea>
    <label for="contactpersoon">Contact Persoon:</label>
    <input type="text" placeholder="contactpersoon" id="contactpersoon" value="${organisatie_info.contactpersoon}">
    <label for="email">Email:</label>
    <input type="email" placeholder="email" value="${organisatie_info.email}" id="email">
    <br>
    <label for="telefoonnummer">Telefoonnummer:</label>
    <input placeholder="telefoonnummer" value="${organisatie_info.telefoonnummer}" id="telefoonnummer">
    <label for="overigedetails">Overige Details:</label>
    <textarea style="resize:none;">${organisatie_info.overige_details}</textarea>
    <button id="save">Save</button>
    `;
}

function removelistener(){
    let save_button = document.getElementById('save')
    save_button.removeEventListener('click', () => {})
}

get_organisatie_id()