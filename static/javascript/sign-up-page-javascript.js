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

