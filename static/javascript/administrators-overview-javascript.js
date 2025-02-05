
// Function for pop up to show up when you click the button

// Add
document.querySelector(".add-administrator-button").addEventListener("click", ()=> {
        console.log('yaas');
        document.querySelector(".background").classList.remove("hide");
        document.querySelector(".js-add").classList.remove("hide");

});

// Details
function detailsPopUp () {
        console.log('yaas');
        document.querySelector(".background").classList.remove("hide");
        document.querySelector(".js-details").classList.remove("hide");
}

document.querySelector(".details-button").addEventListener("click", detailsPopUp);

// Edit
function editPopUp () {
        console.log('yaas');
        document.querySelector(".background").classList.remove("hide");
        document.querySelector(".js-edit").classList.remove("hide");

}

document.querySelector(".edit-button").addEventListener("click", editPopUp);


// Delete
function deletePopUp () {
        console.log('yaas');
        document.querySelector(".background").classList.remove("hide");
        document.querySelector(".js-delete").classList.remove("hide");

}

document.querySelector(".delete-button").addEventListener("click", deletePopUp);
