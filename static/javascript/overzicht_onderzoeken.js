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
                <button data-onderzoek-id="${onderzoek["onderzoek_id"]}" class="update" id="update_button" aria-label="update onderzoek"><i class="fa-solid fa-gear"></i></button>
                <button data-users-id="${onderzoek["onderzoek_id"]}" class="users" id="users_button" aria-label="gebruikers die ingeschreven zijn"><i class="fa-solid fa-user"></i></button>
                </td>
            </tr>
          `
  document.getElementById("onderzoeken_tabel").innerHTML += row;
  });
}

function get_onderzoek(onderzoek_id) {
  fetch(`/api/overzicht_onderzoeken_organisatie/${onderzoek_id}`, {
          method: 'GET',
          headers: {
                  'Accept': 'application/json'
          }
  })
      .then(response => response.json())
      .then(onderzoek => showOnderzoek(onderzoek))
}


function showOnderzoek(onderzoek)
{
  const onderzoekPOPUP = document.getElementById("update_modal");
  onderzoekPOPUP.innerHTML =
  `
    <div class="modal-content">
      <span class="close_updatemodal">&times;</span>
      <h2>Wijzig onderzoek gegevens</h2>
      <label for="title">Title:</label>
      <input type="text" name="title" id="title" value="${onderzoek.titel}" required><br>
      <label for="beschrijving">Beschrijving</label>
      <textarea name="beschrijving" id="beschrijving" value="${onderzoek.beschrijving}" required></textarea><br>
      <label for="datevanaf">Datum vanaf:</label>
      <input type="date" name="datevanaf" id="datevanaf" value="${onderzoek.datumvanaf}" required><br>
      <label for="datetot">Datum tot:</label>
      <input type="date" name="datetot" id="datetot" value="${onderzoek.datumtot}" required><br>
      <input type="submit" value="Wijzig">
    </div>
  `;
}


function update_onderzoek(onderzoek_id)
{
  let titel = document.getElementById("titel").value
  let beschrijving = document.getElementById("beschrijving").value
  let datumvanaf = document.getElementById("datumvanaf").value
  let datumtot = document.getElementById("datumtot").value

  fetch(`/api/overzicht_onderzoeken_organisatie/${onderzoek_id}`, {
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

function users_registered_to_onderzoek(onderzoek_id) {
  fetch(`/api/overzicht_onderzoeken_organisatie/${onderzoek_id}/users`, {
          method: 'GET',
          headers: {
                  'Accept': 'application/json'
          }
  })
      .then(response => response.json())
      .then(user => showUsers(user))
}


function showUsers(users)
{
  const usersPOPUP = document.getElementById("users_modal");
  usersPOPUP.innerHTML =
  `
    <div class="modal-content">
        <span class="close_usersmodal">&times;</span>
        <h2>ingeschreven mensen</h2>
        <table>
            <tr>
                <th>Naam</th>
                <th>Postcode</th>
                <th>Geslacht</th>
                <th>Email</th>

            </tr>
            <tr>
                <td>${users.voornam}</td>
                <td>${users.postcode}</td>
                <td>${users.geslacht}</td>
                <td>${users.emailadres}</td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
  `;
}