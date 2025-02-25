
// Function for pop up to show up when you click the button
fetch('/api/administrators', {
        method: 'GET',
        headers: {
                'Accept': 'application/json'
        }
})
.then(response => response.json())
.then(administrators => showAdministrator(administrators))



function showAdministrator (administrators) {
        administrators.forEach((administrator) => {
                console.log(administrator)

               let row =
                `
                <tr>
                    <td>${administrator.voornaam} ${administrator.tussenvoegsel} ${administrator.achternaam}</td>
                    <td>${administrator.email}</td>
                    <td>
                        <button class="action-button details-button">Details
                            <img class="action-img eye-img" src="../static/images/eye-icon.png">
                        </button>
                        <button class="action-button edit-button">Bewerken
                            <img class="action-img" src="../static/images/edit-icon-2.png">
                        </button>
                        <button class="action-button delete-button">Verwijderen
                            <img class="action-img" src="../static/images/bin-icon.png">
                        </button>
                    </td>
                </tr>
                `
        document.querySelector(".js-administrator-table").innerHTML += row;
        });

        // Add
        document.querySelectorAll(".add-administrator-button")
            .forEach(addButton => {
                addButton.addEventListener("click", ()=> {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-add").classList.remove("hide");
                });
            })

        // Details
        document.querySelectorAll(".details-button").forEach(detailsButton => {
                detailsButton.addEventListener("click", () => {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-details").classList.remove("hide");
                });
        })

        // Edit
        document.querySelectorAll(".edit-button").forEach(editButton => {
                editButton.addEventListener("click", () => {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-edit").classList.remove("hide");
                })

        })

        // Delete
        document.querySelectorAll(".delete-button").forEach(deleteButton => {
                deleteButton.addEventListener("click", () => {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-delete").classList.remove("hide");
                })
        })

        // closing pop up
        document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                crossImage.addEventListener("click", closePopUp)
                        console.log("yuh");
                })

}

//closing pop up when you click on cross img
function closePopUp () {
        document.querySelector(".js-background").classList.add("hide");
        document.querySelector(".js-add").classList.add("hide");
        document.querySelector(".js-details").classList.add("hide");
        document.querySelector(".js-edit").classList.add("hide");
        document.querySelector(".js-delete").classList.add("hide");
}


// to get single administrator
fetch('/api/administrator/<administrator_id>', {
        method: 'GET',
        headers: {
                'Accept': 'application/json'
        }
})
    .then(response => response.json())
    .then (data =>
    console.log(data))


// to add an administrator when you click on add administrator button
document.querySelector(".js-add-button").addEventListener("click", addAdministrator)

function addAdministrator () {
        let fname = document.querySelector('.js-fname-input').value
        let lname = document.querySelector('.js-lname-input').value
        let email = document.querySelector('.js-email-input').value


        console.log(fname, lname, email);

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
                    console.log(data);
            })
}

