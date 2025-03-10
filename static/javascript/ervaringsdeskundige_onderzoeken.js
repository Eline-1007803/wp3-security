/*document.addEventListener("DOMContentLoaded", function () {
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

            popup.style.display = "block";
            popup.setAttribute("aria-hidden", "false");
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        };
    });
});
*/ 
    //window.onclick = function(event) {
        //if (event.target === popup) {
            
            //popup.setAttribute("aria-hidden", "true");
    //}};

    //document.addEventListener("keydown", function(event) {
       // if (event.key === "Escape") {
         //   popup.setAttribute("aria-hidden", "true");
       // }
   // });
//});





//function refreshPage() {

//}

fetch('/openstaande_onderzoeken', {
    method: 'GET',
    headers: {
            'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(onderzoeken => getOpenResearch(onderzoeken))

                
                
function getOpenResearch() {
console.log(onderzoeken); 
let row = `
        <tr class="onderzoek-row">
                    data-titel=${onderzoeken.titel}
                    data-status= ${onderzoeken.status}
                    data-datum-vanaf=${onderzoeken.datum_vanaf}
                    data-datum-tot="{{ onderzoeken.datum_tot }}"
                    data-type="{{ onderzoeken.type }}"
                    data-beschrijving="{{ onderzoeken.beschrijving }}"
                    data-plaatsen="{{ onderzoeken.beschikbaar }}">
                    <td>{{ onderzoeken.onderzoek_id }}</td>
                    <td>{{ onderzoeken.titel }}</td>
                    <td>{{ onderzoeken.status }}</td>
                    <td>{{ onderzoeken.datum_vanaf }}</td>
                    <td>{{ onderzoeken.datum_tot }}</td>
                    <td>{{ onderzoeken.type }}</td>
                </tr>
                ` 
        document.querySelector('.row').innerHTML += row
                
                    
        

}

