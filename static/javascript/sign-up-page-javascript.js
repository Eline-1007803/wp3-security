const checkbox = document.getElementById("supervisor-input");


function showSupervisorForm () {
    if (checkbox.checked === true) {
        console.log("you go girlie");
        document.querySelector(".js-supervisor-info").classList.remove("hide");
    }
}

checkbox.addEventListener("change", showSupervisorForm);
