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
function filter() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("naaminput");
        filter = input.value.toUpperCase();
        table = document.querySelector(".js-organisatietabel");
        tr = table.getElementsByTagName("tr");
      
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
function filter_type() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("select");
        filter = input.value.toUpperCase();
        table = document.querySelector(".js-organisatietabel");
        tr = table.getElementsByTagName("tr");
      
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[2];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }