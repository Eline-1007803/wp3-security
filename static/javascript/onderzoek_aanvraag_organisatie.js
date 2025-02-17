function CheckIn()
{
    var checkbox = document.getElementById("metbeloning");
    var label = document.getElementById("beloninglabel");
    var text = document.getElementById("beloning");

    if(checkbox.checked == true)
    {
        text.style.display = "block";
        label.style.display = "block";
    }
    else
    {
        text.style.display = "none";
        label.style.display = "none";

    }

}

function CheckLocatie()
{
    var type = document.getElementById("typeonderzoek").value;
    var label = document.getElementById("locatie_label");
    var text = document.getElementById("locatie_text");
    if(type == "locatie")
    {
        label.style.display = "block";
        text.style.display = "block";
        document.getElementById("locatie_text").required = true;
    }
    else
    {
        label.style.display = "none";
        text.style.display = "none";
        document.getElementById("locatie_text").required = false;

    }
}

document.getElementById("submit_button").addEventListener("click", add_onderzoek)

function add_onderzoek () {
    let titel = document.getElementById('titel').value
    let beschrijving = document.getElementById('beschrijving').value
    let datum_vanaf = document.getElementById('datumvanaf').value
    let datum_tot = document.getElementById('datumtot').value
    let type_onderzoek = document.getElementById('typeonderzoek').value
    let locatie = document.getElementById('locatie_text').value
    let met_beloning = document.getElementById('metbeloning').value
    let beloning = document.getElementById('beloning').value
    let disability = document.getElementById('disability-type-input').value
    let leeftijd_van = document.getElementById('leeftijdvan').value
    let leeftijd_tot = document.getElementById('leeftijdtot').value
    console.log(datum_vanaf)
    fetch('/api/onderzoekaanvragen', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({"titel":titel,"beschrijving":beschrijving,"datumvanaf":datum_vanaf,"datumtot":datum_tot,"typeonderzoek":type_onderzoek,"locatie_text":locatie,
                "metbeloning":met_beloning,"beloning":beloning,"disability-type-input":disability,"leeftijdvan":leeftijd_van,"leeftijdtot":leeftijd_tot})
    })
        .then(response => response.json())
        .then(data => {
                console.log(data)
        })
}