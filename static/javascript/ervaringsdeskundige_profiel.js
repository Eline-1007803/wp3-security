function get_user_id(){
    fetch('/get_user_id')
        .then(response => response.json())
        .then(get_user_info);
}

function get_user_info(id){
    let user_id = id.expert_id
    fetch(`/api/expert/${user_id}`)
        .then(response => response.json())
        .then(maak_html)
}

function maak_html(expert_info){
    let name = document.getElementById('info');
    name.innerHTML = '';

    name.innerHTML = `
    <h1>Welcome ${expert_info.volle_naam}</h1>
    <h2>Pas hier je persoonlijke gegevens aan:</h2>
    <br>
    <br>
    <p>Naam: ${expert_info.volle_naam}</p>
    <p>Email: ${expert_info.email}</p>
    <p>Telfoonnummer: ${expert_info.telefoonnummer}</p>
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

    let save_button = document.getElementById('save')

    save_button.addEventListener('click', () => {
        if( !(document.getElementById('password').value === document.getElementById('confirm_password').value) ){
            alert("Wachtwoorden zijn niet hetzelfde.")
            removelistener()
            console.log(document.getElementById('password').value, document.getElementById('confirm_password').value)
            get_user_id()
        }
        else {
            let or_voornaam = expert_info.voornaam
            let or_tussenvoegsel = expert_info.tussenvoegsel
            let or_achternaam = expert_info.achternaam
            let or_wachtwoord = expert_info.wachtwoord
            let or_email = expert_info.email
            let or_telnum = expert_info.telefoonnummer
            let voornaam = document.getElementById('voornaam').value
            let tussenvoegsel = document.getElementById('tussenvoegsel').value
            let achternaam = document.getElementById('achternaam').value
            let wachtwoord = document.getElementById('password').value
            let email = document.getElementById('email').value
            let telnum = document.getElementById('telefoonnummer').value
            removelistener()
            fetch(`/api/expert/${expert_info.ervaringsdeskundige_id}`, {
            method: 'PUT',
            headers:{
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
                or_voornaam: or_voornaam,
                or_tussenvoegsel: or_tussenvoegsel,
                or_achternaam: or_achternaam,
                or_wachtwoord: or_wachtwoord,
                or_email: or_email,
                or_telnum: or_telnum,
                voornaam: voornaam,
                tussenvoegsel: tussenvoegsel,
                achternaam: achternaam,
                wachtwoord: wachtwoord,
                email: email,
                telnum: telnum
                })
            })
                .then(response => response)
                .then(get_user_id)
        }


    })
}