
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


document.querySelector(".js-add-button").addEventListener("click", addAdministrator)

function addAdministrator () {
        const fname = document.querySelector('.js-fname-input').value
        const lname = document.querySelector('.js-lname-input').value
        const email = document.querySelector('.js-email-input').value


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

