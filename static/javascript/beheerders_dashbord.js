function refresh_deskundigen(data) {
  let deskundigen_collection = document.getElementById('deskundigen');
  deskundigen_collection.innerHTML = '';

  let deskundigen = data.deskundigen;
  let deskundigen_html = '';

  for (let i = 0; i < deskundigen.length; i++) {
      let deskundigenElement = deskundigen[i];
      deskundigen_html += `
                <tr class="deskundige_btn">
                    <td >${deskundigenElement.volle_naam}</td>
                    <td >${deskundigenElement.leeftijd}</td>
                    <td >${deskundigenElement.naam}</td>
                </tr>
      `;
  }

  deskundigen_collection.innerHTML = deskundigen_html;
  refresh_modals_deskundigen(data);
}
function refresh_modals_deskundigen(data) {
  let deskundigen_modals = document.getElementById('deskundigen_modal');
  deskundigen_modals.innerHTML = '';

  let deskundigen = data.deskundigen;
  let deskundigen_modal_html = '';

  for (let i = 0; i < deskundigen.length; i++) {
      let deskundigenElement = deskundigen[i];
      deskundigen_modal_html += `
                <div id="myModal${i}" class="modal">
                  <div class="modal-content">
                      <button class="close" id="close${i}" >&times;</button>
                      <h2>${deskundigenElement.volle_naam}</h2>
                      <main class="row">
                          <section class="column">
                              <p class="id">${deskundigenElement.ervaringsdeskundige_id}</p>
                              <h3>Persoonlijke informatie</h3>
                              <h4>Geslacht:</h4>
                              <p>${deskundigenElement.geslacht}</p>
                              <h4>Geboortedatum:</h4>
                              <p>${deskundigenElement.geboortedatum}</p>
                              <h4>Introductie:</h4>
                              <p>${deskundigenElement.introductie}</p>
                              <h4>Beperking(en):</h4>
                              <p>${deskundigenElement.naam}</p>
                              <label>Bijzonderheden:</label>
                              <p>${deskundigenElement.bijzonderheden}</p>
                              <label>Hulpmiddelen:</label>
                              <p>${deskundigenElement.hulpmiddelen}</p>
                          </section>
                          <section>
                              <h3>Contactgegevens</h3>
                              <h4>Email:</h4>
                              <p>${deskundigenElement.emailadres}</p>
                              <h4>Telefoonnummer:</h4>
                              <p>${deskundigenElement.telefoonnummer}</p>
                              <h4>postcode:</h4>
                              <p>${deskundigenElement.postcode}</p>
                          </section>
                          <section class="column">
                              <h3>Voogds informatie</h3>
                              <h4>Naam:</h4>
                              <p>${deskundigenElement.naam_voogd}</p>
                              <h4>Email:</h4>
                              <p>${deskundigenElement.email_voogd}</p>
                              <h4>Telefoonnummer:</h4>
                              <p>${deskundigenElement.telefoonnummer_voogd}</p>
                          </section>
                      </main>
                      <button class="goedkeur_button"><strong>Goedkeuren</strong></button>
                      <button class="afkeur_button"><strong>Afkeuren</strong></button>
                  </div>
                </div>
      `;
  }

  deskundigen_modals.innerHTML = deskundigen_modal_html;

  // Attach event listeners for modals
  const modals = deskundigen_modals.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.deskundige_btn');
  const spans = deskundigen_modals.querySelectorAll('.close');
  const deskundigen_gb = deskundigen_modals.querySelectorAll('.goedkeur_button');
  const deskundigen_ab = deskundigen_modals.querySelectorAll('.afkeur_button');
  const ids = deskundigen_modals.querySelectorAll('.id')

  ids.forEach((id) => {
      id.style.display = 'none';
  });

  btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          modals[index].style.display = 'block';
          kill_interval()
      });
  });

  deskundigen_gb.forEach((gb, index) => {
      gb.addEventListener('click', () => {
          modals[index].style.display = 'none';
          let id = modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/deskundigen', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "goedgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  deskundigen_ab.forEach((ab, index) => {
      ab.addEventListener('click', () => {
          modals[index].style.display = 'none';
          let id = modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/deskundigen', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "afgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  spans.forEach((span, index) => {
      span.addEventListener('click', () => {
          modals[index].style.display = 'none';
          revive_interval()
      });
  });

  window.addEventListener('click', (event) => {
      modals.forEach((modal, index) => {
          if (event.target === modal[index]) {
              modal[index].style.display = 'none';
          }
      });
  });
}

function refresh_inschrijvingen(data) {
  let inschrijvingen_collection = document.getElementById('inschrijvingen');
  inschrijvingen_collection.innerHTML = '';

  let inschrijvingen = data.inschrijvingen;
  let inschrijvingen_html = '';

  for (let i = 0; i < inschrijvingen.length; i++) {
      let inschrijvingenElement = inschrijvingen[i];
      inschrijvingen_html += `
                <tr class="inschrijvingen_btn">
                    <td >${inschrijvingenElement.titel}</td>
                    <td >${inschrijvingenElement.beschrijving}</td>
                    <td >${inschrijvingenElement.volle_naam}</td>
                </tr>
      `;
  }

  inschrijvingen_collection.innerHTML = inschrijvingen_html;
  refresh_modals_inschrijvingen(data);
}
function refresh_modals_inschrijvingen(data) {
  let inschrijvingen_modals = document.getElementById('inschrijvingen_modal');
  inschrijvingen_modals.innerHTML = '';

  let inschrijvingen = data.inschrijvingen;
  let inschrijvingen_modal_html = '';

  for (let i = 0; i < inschrijvingen.length; i++) {
      let inschrijvingenElement = inschrijvingen[i];
      inschrijvingen_modal_html += `
                <div id="myModal${i}" class="modal">
                  <div class="modal-content">
                      <button class="close" id="close${i}" >&times;</button>
                      <h2>${inschrijvingenElement.volle_naam} wil zich inschrijven voor '${inschrijvingenElement.titel}'</h2>
                      <p class="id">${inschrijvingenElement.inschrijving_id}</p>
                      <main class="row">
                          <section class="column">
                              <h3>Informatie deskundige</h3>
                              <h4>Geslacht:</h4>
                              <p>${inschrijvingenElement.geslacht}</p>
                              <h4>Geboortedatum:</h4>
                              <p>${inschrijvingenElement.geboortedatum}</p>
                              <h4>Introductie:</h4>
                              <p>${inschrijvingenElement.introductie}</p>
                              <h4>Beperking(en):</h4>
                              <p>${inschrijvingenElement.ev_bep_naam}</p>
                              <label>Bijzonderheden:</label>
                              <p>${inschrijvingenElement.bijzonderheden}</p>
                              <label>Hulpmiddelen:</label>
                              <p>${inschrijvingenElement.hulpmiddelen}</p>
                          </section>
                          <section>
                              <h3>Informatie onderzoek</h3>
                              <h4>Organisatie:</h4>
                              <p>${inschrijvingenElement.orga_naam}</p>
                              <h4>Titel:</h4>
                              <p>${inschrijvingenElement.titel}</p>
                              <h4>Beschrijving:</h4>
                              <p>${inschrijvingenElement.beschrijving}</p>
                              <h4>Periode:</h4>
                              <p>${inschrijvingenElement.datum_vanaf} tot ${inschrijvingenElement.datum_tot}</p>
                              <h4>Type:</h4>
                              <p>${inschrijvingenElement.type}</p>
                              <h4>Locatie:</h4>
                              <p>${inschrijvingenElement.locatie}</p>
                              <h4>Beloning:</h4>
                              <p>${inschrijvingenElement.beloning}</p>
                              <h4>Beperking:</h4>
                              <p>${inschrijvingenElement.on_bep_naam}</p>
                              <h4>Leeftijd range:</h4>
                              <p>${inschrijvingenElement.leeftijd_van} - ${inschrijvingenElement.leeftijd_tot}</p>
                          </section>
                      </main>
                      <button class="goedkeur_button"><strong>Goedkeuren</strong></button>
                      <button class="afkeur_button"><strong>Afkeuren</strong></button>
                  </div>
                </div>
      `;
  }

  inschrijvingen_modals.innerHTML = inschrijvingen_modal_html;

  // Attach event listeners for modals
  const inschrijving_modals = inschrijvingen_modals.querySelectorAll('.modal');
  const inschrijvingen_btns = document.querySelectorAll('.inschrijvingen_btn');
  const inschrijvingen_spans = inschrijvingen_modals.querySelectorAll('.close');
  const inschrijvingen_gb = inschrijvingen_modals.querySelectorAll('.goedkeur_button');
  const inschrijvingen_ab = inschrijvingen_modals.querySelectorAll('.afkeur_button');
  const inschrijvingen_ids = inschrijvingen_modals.querySelectorAll('.id')

  inschrijvingen_ids.forEach((id) => {
    id.style.display = 'none';
  });


  inschrijvingen_btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          inschrijving_modals[index].style.display = 'block';
          kill_interval()
      });
  });

  inschrijvingen_gb.forEach((gb, index) => {
      gb.addEventListener('click', () => {
          inschrijving_modals[index].style.display = 'none';
          let id = inschrijving_modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/inschrijvingen', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "goedgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  inschrijvingen_ab.forEach((ab, index) => {
      ab.addEventListener('click', () => {
          inschrijving_modals[index].style.display = 'none';
          let id = inschrijving_modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/inschrijvingen', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "afgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  inschrijvingen_spans.forEach((span, index) => {
      span.addEventListener('click', () => {
          inschrijving_modals[index].style.display = 'none';
          revive_interval()
      });
  });

  window.addEventListener('click', (event) => {
      inschrijving_modals.forEach((modal, index) => {
          if (event.target === modal[index]) {
              modal[index].style.display = 'none';
          }
      });
  });
}

function refresh_onderzoeken(data) {
  let onderzoeken_collection = document.getElementById('onderzoeken');
  onderzoeken_collection.innerHTML = '';

  let onderzoeken = data.onderzoeken;
  let onderzoeken_html = '';

  for (let i = 0; i < onderzoeken.length; i++) {
      let onderzoekenElement = onderzoeken[i];
      onderzoeken_html += `
                <tr class="onderzoeken_btn">
                    <td >${onderzoekenElement.titel}</td>
                    <td >${onderzoekenElement.beschrijving}</td>
                    <td >${onderzoekenElement.orga_naam}</td>
                </tr>
      `;
  }

  onderzoeken_collection.innerHTML = onderzoeken_html;
  refresh_modals_onderzoeken(data);
}
function refresh_modals_onderzoeken(data) {
  let onderzoeken_modals = document.getElementById('onderzoeken_modal');
  onderzoeken_modals.innerHTML = '';

  let onderzoeken = data.onderzoeken;
  let onderzoeken_modal_html = '';

  for (let i = 0; i < onderzoeken.length; i++) {
      let onderzoekenElement = onderzoeken[i];
      onderzoeken_modal_html += `
                <div id="myModal${i}" class="modal">
                  <div class="modal-content">
                      <button class="close" id="close${i}" >&times;</button>
                      <h2>${onderzoekenElement.titel}</h2>
                      <p class="id">${onderzoekenElement.onderzoek_id}</p>
                      <main class="row">
                          <section class="column">
                              <h3>Informatie onderzoek</h3>
                              <h4>Beschrijving:</h4>
                              <p>${onderzoekenElement.beschrijving}</p>
                              <h4>Type:</h4>
                              <p>${onderzoekenElement.type}</p>
                              <label>Locatie:</label>
                              <p>${onderzoekenElement.locatie}</p>
                              <h4>Beloning:</h4>
                              <p>${onderzoekenElement.beloning}</p>
                              <h4>Organisatie:</h4>
                              <p>${onderzoekenElement.orga_naam}</p>
                          </section>
                          <section>
                              <h3>Restricties onderzoek</h3>
                              <h4>Periode:</h4>
                              <p>${onderzoekenElement.datum_vanaf} tot ${onderzoekenElement.datum_tot}</p>
                              <h4>Beperking:</h4>
                              <p>${onderzoekenElement.bep_naam}</p>
                              <h4>Leeftijd range:</h4>
                              <p>${onderzoekenElement.leeftijd_van} - ${onderzoekenElement.leeftijd_tot}</p>
                          </section>
                      </main>
                      <button class="goedkeur_button"><strong>Goedkeuren</strong></button>
                      <button class="afkeur_button"><strong>Afkeuren</strong></button>
                  </div>
                </div>
      `;
  }

  onderzoeken_modals.innerHTML = onderzoeken_modal_html;

  // Attach event listeners for modals
  const onderzoek_modals = onderzoeken_modals.querySelectorAll('.modal');
  const onderzoeken_btns = document.querySelectorAll('.onderzoeken_btn');
  const onderzoeken_spans = onderzoeken_modals.querySelectorAll('.close');
  const onderzoeken_gb = onderzoeken_modals.querySelectorAll('.goedkeur_button');
  const onderzoeken_ab = onderzoeken_modals.querySelectorAll('.afkeur_button');
  const onderzoeken_ids = onderzoeken_modals.querySelectorAll('.id')

  onderzoeken_ids.forEach((id) => {
    id.style.display = 'none';
  });


  onderzoeken_btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          onderzoek_modals[index].style.display = 'block';
          kill_interval()
      });
  });

  onderzoeken_gb.forEach((gb, index) => {
      gb.addEventListener('click', () => {
          onderzoek_modals[index].style.display = 'none';
          let id = onderzoek_modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/onderzoeken', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "goedgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  onderzoeken_ab.forEach((ab, index) => {
      ab.addEventListener('click', () => {
          onderzoek_modals[index].style.display = 'none';
          let id = onderzoek_modals[index].getElementsByClassName('id')[0].innerHTML
          console.log(id)
          fetch('/api/onderzoeken', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"status": "afgekeurd", "id":id})
          }).then(r => r.json())
          revive_interval()
      });
  });

  onderzoeken_spans.forEach((span, index) => {
      span.addEventListener('click', () => {
          onderzoek_modals[index].style.display = 'none';
          revive_interval()
      });
  });

  window.addEventListener('click', (event) => {
      onderzoeken_modals.forEach((modal, index) => {
          if (event.target === modal[index]) {
              modal[index].style.display = 'none';
          }
      });
  });
}

function get_all() {
    fetch('/api/deskundigen')
        .then(response => response.json())
        .then(refresh_deskundigen);
    fetch('/api/inschrijvingen')
        .then(response => response.json())
        .then(refresh_inschrijvingen);
    fetch('/api/onderzoeken')
        .then(response => response.json())
        .then(refresh_onderzoeken);
}

get_all();

interval = setInterval(get_all, 3000);


function kill_interval() {
    clearInterval(interval)
}

function revive_interval() {
    get_all()
    interval = setInterval(get_all, 3000);
}