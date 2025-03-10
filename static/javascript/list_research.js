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

    popup.setAttribute("aria-hidden", "true");
    popup.style.display = 'none';

    onderzoekRijen.forEach(row => {
        row.addEventListener("click", function() {
            popup.style.display = "block";
            popup.setAttribute("aria-hidden", "false");
            stopInterval()
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
        };
    });
}


//function refreshPage() {

//}
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
                data-status="${onderzoek.status}"
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