document.getElementById("aanmaken").addEventListener("click",organisatie_aanmaken)

function organisatie_aanmaken()
{
    let api_key = "xd"
    let naam = document.getElementById("naam").value
    let option = document.getElementById("option").value
    let website = document.getElementById("website").value
    let beschrijving = document.getElementById("beschrijving").value
    let contactpersoon = document.getElementById("contactpersoon").value
    let email = document.getElementById("email").value
    let number_ = document.getElementById("number").value
    let number = Number(number_)
    let overige_details = document.getElementById("overigedetails").value

    fetch("/api/organisatie_aanmaken/new",{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            "naam": naam,
            "option":option,
            "website":website,
            "beschrijving":beschrijving,
            "contactpersoon":contactpersoon,
            "email":email,
            "number":number,
            "overige_details":overige_details,
            "api_key":api_key
        })
    })
    .then((response => response.json()))
    .then((data => console.log(data)))
}