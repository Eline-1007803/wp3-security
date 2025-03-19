function get_user_id(){
    fetch('/get_user_id')
        .then(response => response.json())
        .then(get_user_info);
}

function get_user_info(id){
    let user_id = id.beheerder_id
    fetch(`/api/administrator/${user_id}`)
        .then(response => response.json())
        .then(fill_html)
}

function fill_html(beheerder_info){
    let name = document.getElementById('info');
    name.innerHTML = '';

    name.innerHTML = `
    <p>${beheerder_info.volle_naam}</p>
    <button>change</button>
    <br>
    <br>
    <p>${beheerder_info.wachtwoord}</p>
    <button>change</button>
    <br>
    <br>
    <p>${beheerder_info.email}</p>
    <button>change</button>
    <br>
    <br>
    <p>${beheerder_info.telefoonnummer}</p>
    <button >change</button>
    `
}

get_user_id()