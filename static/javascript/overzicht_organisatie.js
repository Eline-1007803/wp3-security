fetch('/api/alle_organisaties', {
    method: 'GET',
    headers: {
            'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(organisaties => showOrganisaties(organisaties))
  
  
  function showOrganisaties (organisaties) {
    organisaties.forEach((organisatie) => {
            console.log(organisatie)
  
           let row =
            `
            <tr>
                  <td>${organisatie.organisatie_id}</td>
                  <td>${organisatie.naam}</td>
                  <td>${organisatie.type}</td>
                  <td>${organisatie.website}</td>
                  <td>${organisatie.beschrijving}</td>
                  <td>${organisatie.contactpersoon}</td>
                  <td>${organisatie.email}</td>
                  <td>${organisatie.telefoonnummer}</td>
                  <td>
                  <button data-onderzoek-id="${organisatie["organisatie_id"]}" class="delete" id="delete_button" aria-label="delete organisatie">Delete Organisatie</button>
                  </td>
              </tr>
            `
    document.querySelector(".js-organisatietabel").innerHTML += row;
    });
}