function get_user_id(){
    fetch('/get_user_id')
        .then(response => response.json())
        .then(get_user_info);
}

function get_user_info(id){
    let user_id = id.ervaringsdeskundige_id
    fetch(`/api/expert/${user_id}`)
        .then(response => response.json())
        .then(maak_html)
}

function maak_html(expert_info){
    let name = document.getElementById('info');
    name.innerHTML = '';

    name.innerHTML = `
    <h1>Hallo, ${expert_info.voornaam}</h1>
    <h2>Pas hier je persoonlijke gegevens aan:</h2>
    <br>
    <br>
    <p>Telefoonnummer: ${expert_info.telefoonnummer}</p>
    <div class="form-container">
    <label for="voornaam">Voornaam:</label>
    <input placeholder="${expert_info.voornaam}" id="voornaam">
    <br>
    <label for="tussenvoegsel">Tussenvoegsel:</label>
    <input placeholder="${expert_info.tussenvoegsel}" id="tussenvoegsel">
    <br>
    <label for="achternaam">Achternaam:</label>
    <input placeholder="${expert_info.achternaam}" id="achternaam">
    <br>
    <label for="password">Wachtwoord:</label>
    <input type="password" placeholder="wachtwoord" id="password">
    <label for="confirm_password">Bevestig wachtwoord:</label>
    <input type="password" placeholder="bevestig wachtwoord" id="confirm_password">
    <br>
    <label for="email">Email:</label>
    <input type="email" placeholder="${expert_info.emailadres}" id="email">
    <br>
    <label for="telefoonnummer">Telefoonnummer:</label>
    <input placeholder="${expert_info.telefoonnummer}" id="telefoonnummer">
    <br>
    <label for="postcode">Postcode:</label>
    <input placeholder="${expert_info.postcode}" id="postcode">
    <br>
    <label for="hulpmiddelen">Hulpmiddelen:</label>
    <input placeholder="${expert_info.hulpmiddelen}" id="hulpmiddelen">
    <br>
    <label for="introductie">Introductie:</label>
    <input placeholder="${expert_info.introductie}" id="introductie">
    <br>
    <label for="bijzonderheden">Bijzonderheden:</label>
    <input placeholder="${expert_info.bijzonderheden}" id="bijzonderheden">
    <br>
    <button id="save">Opslaan</button>
    </div>
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
            let or_email = expert_info.emailadres
            let or_telnr = expert_info.telefoonnummer
            let or_postcode = expert_info.postcode
            let or_geslacht = expert_info.geslacht
            let or_hulpmiddelen = expert_info.hulpmiddelen
            let or_introductie = expert_info.introductie
            let or_bijzonderheden = expert_info.bijzonderheden
            let or_voorkeur_benadering = expert_info.voorkeur_benadering
            let voornaam = document.getElementById('voornaam').value
            let tussenvoegsel = document.getElementById('tussenvoegsel').value
            let achternaam = document.getElementById('achternaam').value
            let wachtwoord = document.getElementById('password').value
            let email = document.getElementById('email').value
            let telnr = document.getElementById('telefoonnummer').value
            let postcode = document.getElementById('postcode').value
            let hulpmiddelen = document.getElementById('hulpmiddelen').value
            let introductie = document.getElementById('introductie').value
            let bijzonderheden = document.getElementById('bijzonderheden').value
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
                or_telnr: or_telnr,
                or_postcode: or_postcode,
                or_geslacht: or_geslacht,
                or_hulpmiddelen: or_hulpmiddelen,
                or_introductie: or_introductie,
                or_bijzonderheden: or_bijzonderheden,
                or_voorkeur_benadering: or_voorkeur_benadering,
                voornaam: voornaam,
                tussenvoegsel: tussenvoegsel,
                achternaam: achternaam,
                wachtwoord: wachtwoord,
                email: email,
                telnr: telnr,
                postcode: postcode,
                hulpmiddelen: hulpmiddelen,
                introductie: introductie,
                bijzonderheden: bijzonderheden,
                })
            })
                .then(response => response)
                .then(get_user_id)
        }


    })
}

function removelistener(){
    let save_button = document.getElementById('save')
    save_button.removeEventListener('click', () => {})
}

get_user_id()