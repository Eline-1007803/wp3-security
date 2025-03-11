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
                <td><select name="actie" class="actie_update" data-actie-id="${onderzoek["onderzoek_id"]}" id="actie${onderzoek["onderzoek_id"]}" aria-label="Selecteer een van onder (keuze optie)">
                    <option value="">Kies..</option>
                    <option value="sluiten">Sluiten</option>
                </select>
                <button data-onderzoek-id="${onderzoek["onderzoek_id"]}" class="update" id="update_button" aria-label="update onderzoek"><i class="fa-solid fa-gear"></i></button>
                <button data-users-id="${onderzoek["onderzoek_id"]}" class="users" id="users_button" aria-label="gebruikers die ingeschreven zijn"><i class="fa-solid fa-user"></i></button>
                </td>
            </tr>
          `
  document.querySelector(".js-onderzoektabel").innerHTML += row;
  });
  document.querySelectorAll('.update').forEach(button => {
    button.addEventListener('click', () => {
      const onderzoek_id = button.dataset.onderzoekId;
      get_onderzoek(onderzoek_id);
    });
  });
  document.querySelectorAll('.users').forEach(button => {
    button.addEventListener('click', () => {
      const onderzoek_id = button.dataset.usersId;
      users_registered_to_onderzoek(onderzoek_id);
    });
  });
  document.querySelectorAll('.actie_update').forEach(select => {
    select.addEventListener('change', () => {
      const onderzoek_id = select.dataset.actieId;
      change_status(onderzoek_id);
    });
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
  const onderzoekPOPUP = document.querySelector(".updatemodal");
  onderzoekPOPUP.innerHTML =
  `
    <div class="modal-content">
      <span id="close" class="close_updatemodal">&times;</span>
      <h2>Wijzig onderzoek gegevens</h2>
      <label for="titel">Title:</label>
      <input type="text" name="title" id="titel" value="${onderzoek.titel}" required><br>
      <label for="beschrijving">Beschrijving</label>
      <textarea name="beschrijving" id="beschrijving" required>${onderzoek.beschrijving}</textarea><br>
      <label for="datumvanaf">Datum vanaf:</label>
      <input type="date" name="datevanaf" id="datumvanaf" value="${onderzoek.datum_vanaf}" required><br>
      <label for="datumtot">Datum tot:</label>
      <input type="date" name="datetot" id="datumtot" value="${onderzoek.datum_tot}" required><br>
      <button data-onderzoek-id="${onderzoek["onderzoek_id"]}" id="wijzigbutton">Wijzig</button>
    </div>
  `;
  onderzoekPOPUP.style.display = "block";
  document.getElementById("wijzigbutton").addEventListener("click",function(){
    const wijzigbutton = document.getElementById("wijzigbutton")
    const onderzoek_id = wijzigbutton.dataset.onderzoekId
    update_onderzoek(onderzoek_id)
  });

  document.getElementById("close").addEventListener("click",function()
  {
    onderzoekPOPUP.style.display = "none";
  })
  window.onclick = function(event) {
    if (event.target == onderzoekPOPUP) {
        onderzoekPOPUP.style.display = "none";
    }}
}


function update_onderzoek(onderzoek_id)
{
  let titel = document.getElementById("titel").value
  let beschrijving = document.getElementById("beschrijving").value
  let datumvanaf = document.getElementById("datumvanaf").value
  let datumtot = document.getElementById("datumtot").value

  fetch(`/api/overzicht_onderzoeken_organisatie/update=${onderzoek_id}`, {
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
  usersPOPUP.style.display = "block";
  document.querySelector(".close_usersmodal").addEventListener("click",function()
  {
    usersPOPUP.style.display = "none";
  })
  window.onclick = function(event) {
    if (event.target == usersPOPUP) {
        usersPOPUP.style.display = "none";
    }}
}
function change_status(onderzoek_id)
{
  let status = document.getElementById("actie"+onderzoek_id).value
  fetch(`/api/overzicht_onderzoeken_organisatie/${onderzoek_id}`, {
    method: 'PATCH',
    headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "status":status
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
}