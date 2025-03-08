var update_modal = document.getElementById("update_modal");

var update_btn = document.getElementById("update_button");

var span_for_update_modal = document.getElementsByClassName("close_updatemodal")[0];

update_btn.onclick = function() {
  update_modal.style.display = "block";
}

span_for_update_modal.onclick = function() {
  update_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == update_modal) {
    update_modal.style.display = "none";
  }
}


var user_modal = document.getElementById("users_modal");

var users_btn = document.getElementById("users_button");

var span_for_user_modal = document.getElementsByClassName("close_usersmodal")[0];

users_btn.onclick = function() {
  user_modal.style.display = "block";
}

span_for_user_modal.onclick = function() {
  user_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == user_modal) {
    user_modal.style.display = "none";
  }
}


fetch('/api/overzicht_onderzoeken_organisatie', {
  method: 'GET',
  headers: {
          'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(onderzoeken => showOnderzoeken(onderzoeken))


function showOnderzoeken (onderzoeken) {
  onderzoeken.forEach((onderzoek) => {
          console.log(onderzoek)

         let row =
          `
          <tr>
                <td>${onderzoek.titel}</td>
                <td>${onderzoek.status}</td>
                <td>Ja</td>
                <td>${onderzoek.leeftijd_van}</td>
                <td>${onderzoek.leeftijd_tot}</td>
                <td>${onderzoek.beperking}</td>
                <td><select name="actie" id="actie" aria-label="Selecteer een van onder (keuze optie)">
                    <option value="">Kies..</option>
                    <option value="goedkeuren">Goedkeuren</option>
                    <option value="sluiten">Sluiten</option>
                </select>
                <button class="update" id="update_button" aria-label="update onderzoek"><i class="fa-solid fa-gear"></i></button>
                <button class="users" id="users_button" aria-label="gebruikers die ingeschreven zijn"><i class="fa-solid fa-user"></i></button>
                </td>
            </tr>
          `
  document.getElementById("onderzoeken_tabel").innerHTML += row;
  });
}
function update_onderzoek(onderzoek_id)
{
  let titel = document.getElementById("tiutel").value
  let beschrijving = document.getElementById("beschrijving").value
  let datumvanaf = document.getElementById("datumvanaf").value
  let datumtot = document.getElementById("datumtot").value

  fetch(`/api/overzicht_onderzoeken_organisatie/edit/${onderzoek_id}`, {
    method: 'PATCH',
    headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "titel":titel,
      "beschrijving":beschrijving,
      "datumvanaf":datumvanaf,
      "datumtot":datumtot
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
}
