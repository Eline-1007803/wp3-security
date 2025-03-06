const checkbox = document.getElementById("supervisor-input");


function showSupervisorForm () {
    if (checkbox.checked === true) {
        console.log("you go girlie")
        document.querySelector(".js-supervisor-info").classList.remove("hide");
        document.querySelector(".js-space").classList.remove("hide");
    }
    else {
        document.querySelector(".js-supervisor-info").classList.add("hide");
        document.querySelector(".js-space").classList.add("hide");
    }
}

checkbox.addEventListener("change", showSupervisorForm);


document.querySelector(".js-submit-button").addEventListener("click", saveSignup);

function saveSignup () {
    let fname = document.querySelector('.js-first-name-input').value
    let lname = document.querySelector('.js-last-name-input').value

    fetch('/api/save-signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            fname: fname,
            lname: lname

        })
    })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
}


