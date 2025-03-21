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
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
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
    <textarea id="beschrijving" style="resize:none;">${organisatie_info.beschrijving}</textarea>
    <label for="contactpersoon">Contact Persoon:</label>
    <input type="text" placeholder="contactpersoon" id="contactpersoon" value="${organisatie_info.contactpersoon}">
    <label for="email">Email:</label>
    <input type="email" placeholder="email" value="${organisatie_info.email}" id="email">
    <br>
    <label for="telefoonnummer">Telefoonnummer:</label>
    <input placeholder="telefoonnummer" value="${organisatie_info.telefoonnummer}" id="telefoonnummer">
    <label for="overigedetails">Overige Details:</label>
    <textarea name="overigedetails" id="overigedetails" style="resize:none;">${organisatie_info.overige_details}</textarea>
    <button id="save">Save</button>
    <button id="generate_key">Generate api key</button>
    `;
    let save_button = document.getElementById('save')
    
    save_button.addEventListener('click', () => {
        let voornaam = document.getElementById('naam').value
        let wachtwoord = document.getElementById('wachtwoord').value
        let select = document.getElementById('select').value
        let website = document.getElementById('url').value
        let beschrijving = document.getElementById('beschrijving').value
        let contactpersoon = document.getElementById('contactpersoon').value
        let overigedetails = document.getElementById('overigedetails').value
        let email = document.getElementById('email').value
        let telnum = document.getElementById('telefoonnummer').value
        removelistener()
        fetch(`/api/updateorganisatie/${organisatie_info.organisatie_id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                naam: voornaam,
                password:wachtwoord,
                option:select,
                website:website,
                beschrijving:beschrijving,
                contactpersoon:contactpersoon,
                overige_details:overigedetails,
                email:email,
                number:telnum,
            })
        })
        .then(response => response)
        .then(get_organisatie_id);
    });
    let generate_key_button = document.getElementById('generate_key');
    let generatedApiKey = '';
    generate_key_button.addEventListener('click', () => {
        generatedApiKey = generateRandomString(32);
        alert(`Generated API Key: ${generatedApiKey}`);
    });
    document.getElementById("generate_key").addEventListener("click", function (){
        fetch(`/api/updateorganisatie/newapi_key/${organisatie_info.organisatie_id}`,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                api_key:generatedApiKey
            })
        })
        .then(response => response)
        .then(get_organisatie_id);
    });

}
function removelistener(){
    let save_button = document.getElementById('save')
    save_button.removeEventListener('click', () => {})
}

get_organisatie_id()