function refresh_deskundigen(data) {
  let deskundigen_collection = document.getElementById('deskundigen');
  deskundigen_collection.innerHTML = '';

  // Assuming 'data.deskundigen' is a list of experts
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
                      <main class="row">
                          <section class="column">
                              <h2>${deskundigenElement.volle_naam}</h2>
                          </section>
                      </main>
                  </div>
                </div>
      `;
  }

  deskundigen_modals.innerHTML = deskundigen_modal_html;

  // Attach event listeners for modals
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.deskundige_btn');
  const spans = document.querySelectorAll('.close');

  btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          modals[index].style.display = 'block';
          kill_interval()
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
              modal.style.display = 'none';
          }
      });
  });
}

function get_deskundigen() {
    fetch('/api/deskundigen')
        .then(response => response.json())
        .then(refresh_deskundigen);
}

get_deskundigen();

interval = setInterval(get_deskundigen, 3000);


function kill_interval() {
    clearInterval(interval)
}

function revive_interval() {
    interval = setInterval(get_deskundigen, 3000);
}