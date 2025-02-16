
// Function for pop up to show up when you click the button

// Add
document.querySelector(".add-administrator-button").addEventListener("click", ()=> {
        console.log('yaas');
        document.querySelector(".js-background").classList.remove("hide");
        document.querySelector(".js-add").classList.remove("hide");
});

// Details
function detailsPopUp () {
        console.log('yaas');
        document.querySelector(".js-background").classList.remove("hide");
        document.querySelector(".js-details").classList.remove("hide");
}

document.querySelector(".details-button").addEventListener("click", detailsPopUp);

// Edit
function editPopUp () {
        console.log('yaas');
        document.querySelector(".js-background").classList.remove("hide");
        document.querySelector(".js-edit").classList.remove("hide");
}

document.querySelector(".edit-button").addEventListener("click", editPopUp);


// Delete
function deletePopUp () {
        console.log('yaas');
        document.querySelector(".js-background").classList.remove("hide");
        document.querySelector(".js-delete").classList.remove("hide");
}

document.querySelector(".delete-button").addEventListener("click", deletePopUp);

function closePopUp () {
        document.querySelector(".js-background").classList.add("hide");
        document.querySelector(".js-add").classList.add("hide");
        document.querySelector(".js-details").classList.add("hide");
        document.querySelector(".js-edit").classList.add("hide");
        document.querySelector(".js-delete").classList.add("hide");
}

document.querySelectorAll(".js-cross-image")
    .forEach(element => {
            element.addEventListener("click", closePopUp);
    });


//to get all administrators
fetch('/api/administrators', {
        method: 'GET',
        headers: {
                'Accept': 'application/json'
        }
})
.then(response => response.json())
.then(data => {
        console.log(data)
})

// to add an administrator when you click on add administrator button
document.querySelector(".js-add-button").addEventListener("click", addAdministrator)

function addAdministrator () {
        let fname = document.querySelector('.js-fname-input').value
        let lname = document.querySelector('.js-lname-input').value
        let email = document.querySelector('.js-email-input').value


        console.log(fname, lname, email)

        fetch('/api/new-administrator', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({fname: fname, lname: lname, email: email})
        })
            .then(response => response.json())
            .then(data => {
                    console.log(data)
            })
}
// to update administrator data when you click on edit administrator button
document.querySelector(".js-edit-button").addEventListener("click", editAdministrator)
function editAdministrator () {
        let voornaam = document.querySelector(".js-fname-update").value
        let achternaam = document.querySelector(".js-lname-update").value

        fetch('/api/administrator/<administrator_id>', {
                method: 'PATCH',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        voornaam: voornaam,
                        achternaam: achternaam,

                })

        })
            .then(response => response.json())
            .then(data => {
                    console.log(data)
            })
}