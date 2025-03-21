function fetchResearch() {
  fetch('/api/overzicht_onderzoeken_organisatie', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
      .then(response => response.json())
      .then(onderzoeken => showOnderzoeken(onderzoeken))
}
fetchResearch()
let fetchinterval = setInterval(fetchResearch, 5000);

function showOnderzoeken (onderzoeken) {
  document.querySelector(".js-tabel").innerHTML = '';

  onderzoeken.forEach((onderzoek) => {
        let beschikbaar;
        if (onderzoek.beschikbaar === 0)
        {
          beschikbaar = "Nee"
        }
        else
        {
          beschikbaar = "Ja" 
        }
         let row =
          `
          <tr>
                <td>${onderzoek.onderzoek_id}</td>
                <td>${onderzoek.titel}</td>
                <td>${onderzoek.status}</td>
                <td>${beschikbaar}</td>
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
  document.querySelector(".js-tabel").innerHTML += row;
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
  filter()
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
function filter() {
  var id_input,input_title, input_status, input_beschikbaarheid, input_leeftijdvan, input_leeftijdtot, filter_title, filter_status, filter_beschikbaar, filter_leeftijdvan, filter_leeftijdtot, table, tr, td, i;
  id_input = document.getElementById("idinput")
  input_title = document.getElementById("titleinput");
  input_status = document.getElementById("select");
  input_beschikbaarheid = document.getElementById("beschikbaarinput");
  input_leeftijdvan = document.getElementById("leeftijdvaninput");
  input_leeftijdtot = document.getElementById("leeftijdtotinput");
  leeftijd_tot = document.getElementById("leeftijdtotinput");

  filter_id = id_input.value.toUpperCase();
  filter_title = input_title.value.toUpperCase();
  filter_status = input_status.value.toUpperCase();
  filter_beschikbaar = input_beschikbaarheid.value.toUpperCase();
  filter_leeftijdvan = input_leeftijdvan.value.toUpperCase();
  filter_leeftijdtot = input_leeftijdtot.value.toUpperCase();

  table = document.querySelector(".js-onderzoektabel");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td_id = tr[i].getElementsByTagName("td")[0];
    td_title = tr[i].getElementsByTagName("td")[1];
    td_status = tr[i].getElementsByTagName("td")[2];
    td_beschikbaarheid = tr[i].getElementsByTagName("td")[3];
    td_leeftijdvan = tr[i].getElementsByTagName("td")[4];
    td_leeftijdtot = tr[i].getElementsByTagName("td")[5];

    if (td_id || td_title || td_status || td_beschikbaarheid || td_leeftijdvan || td_leeftijdtot) {
      idvalue = td_id.textContent || td_id.textContent;
      titlevalue = td_title.textContent || td_title.textContent;
      statusvalue = td_status.textContent || td_status.textContent;
      beschikbaarvalue = td_beschikbaarheid.textContent || td_beschikbaarheid.textContent;
      leeftijd_vanstatus = td_leeftijdvan.textContent || td_leeftijdvan.textContent;
      leeftijd_totstatus = td_leeftijdtot.textContent || td_leeftijdtot.textContent;

      if (idvalue.toUpperCase().indexOf(filter_id) > -1 &&
          titlevalue.toUpperCase().indexOf(filter_title) > -1 &&
          statusvalue.toUpperCase().indexOf(filter_status) > -1 &&
          beschikbaarvalue.toUpperCase().indexOf(filter_beschikbaar) > -1 &&
          leeftijd_vanstatus.toUpperCase().indexOf(filter_leeftijdvan) > -1 &&
          leeftijd_totstatus.toUpperCase().indexOf(filter_leeftijdtot) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function showOnderzoek(onderzoek)
{
  const onderzoekPOPUP = document.querySelector(".updatemodal");
  onderzoekPOPUP.innerHTML =
  `
    <div class="modalupdate-content">
      <span id="close" class="close_updatemodal">&times;</span><br>
      <h2>Wijzig onderzoek gegevens</h2><br>
      <label for="titel">Title:</label>
      <input type="text" name="title" id="titel" value="${onderzoek.titel}" required><br>
      <label for="beschrijving">Beschrijving</label>
      <textarea name="beschrijving" id="beschrijving" required>${onderzoek.beschrijving}</textarea>
      <label for="datumvanaf">Datum vanaf:</label>
      <input type="date" name="datevanaf" id="datumvanaf" value="${onderzoek.datum_vanaf}" required><br>
      <label for="datumtot">Datum tot:</label>
      <input type="date" name="datetot" id="datumtot" value="${onderzoek.datum_tot}" required><br>
      <button data-onderzoek-id="${onderzoek["onderzoek_id"]}" class="wijzigbutton" id="wijzigbutton">Wijzig</button>
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
    alert(data)
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
  let gegevens = "";
  users.forEach((user)=>
  {
    console.log(user)
    let row =
    `
      <tr>
      <td>${user.voornaam}</td>
      <td>${user.postcode}</td>
      <td>${user.geslacht}</td>
      <td>${user.emailadres}</td>
      </tr>
    `;
    gegevens +=row;
  });
  usersPOPUP.innerHTML =
  `
    <div class="modalusers-content">
        <span class="close_usersmodal">&times;</span>
        <h2>ingeschreven mensen</h2>
        <input type="text" id="naaminput" onkeyup="filter_users()" placeholder="Zoek ervaringdeskundige op naam.." aria-label="Zoek ervaringdeskundige op naam">
        <input type="text" id="postcodeinput" onkeyup="filter_users()" placeholder="Zoek poscode van ervaringdeskundige.." aria-label="Zoek poscode van ervaringdeskundige">
        <input type="text" id="geslachtinput" onkeyup="filter_users()" placeholder="Zoek status.." aria-label="Zoek status van onderzoek">
        <select name="select" id="select" onchange="filter_users()">
          <option>Kies..</option>
          <option value="man">Man</option>
          <option value="vrouw">Vrouw</option>
          <option value="anders">Anders</option>
        </select>
        <input type="text" id="emailinput" onkeyup="filter_users()" placeholder="Zoek email.." aria-label="Zoek op email van gebruiker">
        <table>
            <tr>
                <th>Naam</th>
                <th>Postcode</th>
                <th>Geslacht</th>
                <th>Email</th>

            </tr>
            ${gegevens}
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
function filter_users() {
  var naaminput,postcodeinput, geslachtinput, emailinput, filter_naam, filter_postcode, filter_geslacht,filter_email, table, tr, td, i;
  naaminput = document.getElementById("naaminput")
  postcodeinput = document.getElementById("postcodeinput");
  geslachtinput = document.getElementById("select");
  emailinput = document.getElementById("emailinput");

  filter_naam = naaminput.value.toUpperCase();
  filter_postcode = postcodeinput.value.toUpperCase();
  filter_geslacht = geslachtinput.value.toUpperCase();
  filter_email = emailinput.value.toUpperCase();

  table = document.getElementById("users_modal");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td_naam = tr[i].getElementsByTagName("td")[0];
    td_postcode = tr[i].getElementsByTagName("td")[1];
    td_geslacht = tr[i].getElementsByTagName("td")[2];
    td_email = tr[i].getElementsByTagName("td")[3];


    if (td_naam || td_postcode || td_geslacht || td_email) {
      naamvalue = td_naam.textContent || td_naam.textContent;
      postcodevalue = td_postcode.textContent || td_postcode.textContent;
      geslachtvalue = td_geslacht.textContent || td_geslacht.textContent;
      emailvalue = td_email.textContent || td_email.textContent;

      if (naamvalue.toUpperCase().indexOf(filter_naam) > -1 &&
          postcodevalue.toUpperCase().indexOf(filter_postcode) > -1 &&
          geslachtvalue.toUpperCase().indexOf(filter_geslacht) > -1 &&
          emailvalue.toUpperCase().indexOf(filter_email) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
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