function set_modal() {
    let onderzoekRijen = document.querySelectorAll(".onderzoek-row");
    let popup = document.getElementById("onderzoekPopup");
    let closePopup = document.querySelector(".close-popup");
    let popupId = document.getElementById("popupId");
    let popupStatus = document.getElementById("popupStatus");
    let popupDatumVanaf = document.getElementById("popupDatumVanaf");
    let popupDatumTot = document.getElementById("popupDatumTot");
    let popupType = document.getElementById("popupType");
    let popupBeschrijving = document.getElementById("popupBeschrijving");
    let popupPlaatsen = document.getElementById("popupPlaatsen");
    let popupLocatie = document.getElementById("popupLocatie");
    let popupBeloning = document.getElementById("popupBeloning");
    let popupLeeftijdVan = document.getElementById("popupLeeftijdVan");
    let popupLeeftijdTot = document.getElementById("popupLeeftijdTot");

    //popup.setAttribute("aria-hidden", "true");
    //popup.style.display = 'none';

    onderzoekRijen.forEach(row => {
        row.addEventListener("click", function() {
            stopInterval()
            popup.style.display = "block";
            popup.setAttribute("aria-hidden", "false");
            
            document.getElementById("popupTitel").innerText = this.getAttribute("data-titel");
            if (popupId) popupId.innerText = this.getAttribute("data-id");
            popupStatus.innerText = this.getAttribute("data-status");
            popupDatumVanaf.innerText = this.getAttribute("data-datum-vanaf");
            popupDatumTot.innerText = this.getAttribute("data-datum-tot");
            popupType.innerText = this.getAttribute("data-type");
            popupBeschrijving.innerText = this.getAttribute("data-beschrijving");
            popupPlaatsen.innerText = this.getAttribute("data-plaatsen");
            popupLocatie.innerText = this.getAttribute("data-locatie");
            popupBeloning.innerText = this.getAttribute("data-beloning");
            popupLeeftijdVan.innerText = this.getAttribute("data-leeftijd-van");
            popupLeeftijdTot.innerText = this.getAttribute("data-leeftijd-tot");

            
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        startInterval()
        popup.setAttribute("aria-hidden", "true");
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        }
    });
    zoekTitels()
}


function getOnderzoeken() {

fetch('/api/ingeschreven_onderzoeken', {  
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(onderzoeken => {
    console.log("Ontvangen onderzoeken:", onderzoeken);
    getSignedUpResearch(onderzoeken);
})
.catch(error => console.error("Fout bij ophalen onderzoeken:", error));

}

                
function getSignedUpResearch(onderzoeken) {
    console.log(onderzoeken); 
    let tableBody = document.querySelector('.table-clickable tbody');
    tableBody.innerHTML = '';

    onderzoeken.forEach(onderzoek => {
        let row = `
            <tr class="onderzoek-row"
                data-titel="${onderzoek.titel}"
                data-status="${onderzoek.inschrijving_status}"
                data-datum-vanaf="${onderzoek.datum_vanaf}"
                data-datum-tot="${onderzoek.datum_tot}"
                data-type="${onderzoek.type}"
                data-beschrijving="${onderzoek.beschrijving}"
                data-plaatsen="${onderzoek.beschikbaar}"
                data-locatie="${onderzoek.locatie}"
                data-leeftijd-van="${onderzoek.leeftijd_van}"
                data-leeftijd-tot="${onderzoek.leeftijd_tot}">
                <td>${onderzoek.onderzoek_id}</td>
                <td>${onderzoek.titel}</td>
                <td>${onderzoek.datum_vanaf}</td>
                <td>${onderzoek.datum_tot}</td>
                <td>${onderzoek.type}</td>
                <td>${onderzoek.inschrijving_status}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });
    set_modal()
}

getOnderzoeken()

interval = setInterval(getOnderzoeken, 3000);

function stopInterval() {
    clearInterval(interval)
}

function startInterval() {
    getOnderzoeken()
    interval = setInterval(getOnderzoeken, 3000);
}

document.getElementById('afmeldenButton').onclick = function () {
alert('Je hebt je nu uitgeschreven voor dit onderzoek.');
document.getElementById('set_modal').style.display = 'none';
}

function zoekTitels() {
    let input_titel, input_status, filter_titel, filter_status, table, tr, td_titel, td_status, i, txtValue_titel, txtValue_status;
    input_titel = document.getElementById("zoekTitel");
    input_status = document.getElementById("statusOnderzoek")
    filter_titel = input_titel.value.toUpperCase();
    filter_status = input_status.value.toUpperCase();
    table = document.getElementById("tabelOnderzoeken");
    tr = table.getElementsByTagName("tr");

    for ( i = 0; i < tr.length; i++) {
         td_titel = tr[i].getElementsByTagName("td")[1];
         td_status = tr[i].getElementsByTagName("td")[5]; // nog aanpassen!!
        if (td_status || td_titel) {
             txtValue_titel = td_titel.textContent || td_titel.innerText;
             txtValue_status = td_status.textContent || td_status.innerText
            if (txtValue_titel.toUpperCase().indexOf(filter_titel) > -1 &&
                (filter_status === "" || txtValue_status.toUpperCase() === filter_status)) {
                    tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/*function filterStatus() {
    let select, selectedStatus, table, tr, td, i;
    select = document.getElementById("statusOnderzoek");
    selectedStatus = select.value.toUpperCase();
    table = document.getElementById("tabelOnderzoeken");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4]; //Deze nog aanpassen naar status en niet datum
        if (td) {
            let statusValue = td.textContent || td.innerText;
            if (selectedStatus === "" || statusValue.toUpperCase() === selectedStatus) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}*/