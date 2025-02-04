details = document.querySelector(".details-button")

function detailsPopUp () {
        console.log('yaas');
        document.querySelector(".js-details").classList.remove("hide");

}

document.querySelector(".details-button").addEventListener("click", detailsPopUp);
