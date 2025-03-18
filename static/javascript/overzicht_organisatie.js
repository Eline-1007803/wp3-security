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
                  <button data-organisatie-id="${organisatie["organisatie_id"]}" class="delete" id="delete_button" aria-label="delete organisatie">Delete Organisatie</button>
                  </td>
              </tr>
            `
    document.querySelector(".js-organisatietabel").innerHTML += row;
    });
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', () => {
          const organisatie_id = button.dataset.organisatieId;
          delete_organisatie(organisatie_id);
        });
      });
}

function delete_organisatie(organisatie_id)
{
        fetch(`/api/alle_organisaties/delete=${organisatie_id}`,{
                method: "DELETE",
                headers: {
                        "Content-type":"application/json"
                }
        })
        .then (response => response.json())
        .then (data => console.log(data))
}