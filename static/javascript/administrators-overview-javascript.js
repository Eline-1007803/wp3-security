
// get all administrators
function getAllAdminstrators()
{
        administrators = []
        document.querySelector('.js-searchbar').addEventListener('onkeyup', e => {
                const value = e.target.value.toLowerCase()
                administrators.forEach(administrator => {
                        const isVisibile = fullName.includes(value).toLowerCase() || `${administrator.email}`.includes(value)
                        administrator.element.classList.toggle('hide', !isVisibile)
                })})

        fetch('/api/administrators', {
                method: 'GET',
                headers: {
                        'Accept': 'application/json'
                }
        })
            .then(response => response.json())
            .then(administrators => showAdministrator(administrators))
}
getAllAdminstrators();
setInterval(getAllAdminstrators, 5000);

// showing each administrator on page
function showAdministrator (administrators) {
        document.querySelector(".js-administrator-table").innerHTML = '';
        administrators.forEach((administrator) => {
                console.log(administrator)
                let fullName = administrator.tussenvoegsel ? `${administrator.voornaam} ${administrator.tussenvoegsel} ${administrator.achternaam}` : `${administrator.voornaam} ${administrator.achternaam}`;
                let rows =
                `
                <tr>
                    <td>${fullName}</td>
                    <td>${administrator.email}</td>
                    <td>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button details-button">Details
                            <img class="action-img eye-img" src="../static/images/eye-icon.png">
                        </button>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button edit-button">Bewerken
                            <img class="action-img" src="../static/images/edit-icon-2.png">
                        </button>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button delete-button">Verwijderen
                            <img class="action-img" src="../static/images/bin-icon.png">
                        </button>
                    </td>
                </tr>
                `
                document.querySelector(".js-administrator-table").innerHTML += rows;


        });

        // Add button pop up
        document.querySelectorAll(".add-administrator-button")
            .forEach(addButton => {
                addButton.addEventListener("click", ()=> {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-add").classList.remove("hide");
                });
            })

        // Details button pop up
        document.querySelectorAll(".details-button").forEach(detailsButton => {
                const adminId = detailsButton.dataset.adminId;

                detailsButton.addEventListener("click", () => {
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-details").classList.remove("hide");

                        showAdminPopup(adminId);
                });
        })

        // Edit button pop up
        document.querySelectorAll(".edit-button").forEach(editButton => {
                const adminId = editButton.dataset.adminId;
                editButton.addEventListener("click", () => {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-edit").classList.remove("hide");

                        getAdmin(adminId);
                })

        })

        // Delete button pop up
        document.querySelectorAll(".delete-button").forEach(deleteButton => {
                deleteButton.addEventListener("click", () => {
                        const adminId = deleteButton.dataset.adminId;
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-delete").classList.remove("hide");

                        getAdminForDelete(adminId);
                })
        })


}


// to get single administrator
function showAdminPopup(administratorId) {
        fetch(`/api/administrator/${administratorId}`, {
                method: 'GET',
                headers: {
                        'Accept': 'application/json'
                }
        })
            .then(response => response.json())
            .then(administrator => showSingleAdministrator(administrator))
}

function showSingleAdministrator(administrator) {
        const administratorDetails = document.querySelector(".js-details");
        console.log(administratorDetails);

        administratorDetails.innerHTML =
        `
                <img class="js-cross-image cross-image" src="../static/images/cross.svg">
                <h1 class="details-header">Details</h1>
                    
                <d1>
                        <dt>Naam:</dt>
                        <dd>${administrator.voornaam}</dd>
                        <dt>Email:</dt>
                        <dd>${administrator.email}</dd>
                </d1>
        `;

        // closing pop up
        document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                crossImage.addEventListener("click", closePopUp)
                        console.log("yuh");
                })

        function closePopUp() {
                document.querySelector(".js-background").classList.add("hide");
                document.querySelector(".js-add").classList.add("hide");
                document.querySelector(".js-details").classList.add("hide");
                document.querySelector(".js-edit").classList.add("hide");
                document.querySelector(".js-delete").classList.add("hide");
}
}


// to add an administrator when you click on add administrator button
document.querySelector(".js-add-button").addEventListener("click", () => {
        addAdministrator ()
         document.querySelector(".js-background").classList.add("hide");
        document.querySelector(".js-add").classList.add("hide");
        document.querySelector(".js-details").classList.add("hide");
        document.querySelector(".js-edit").classList.add("hide");
        document.querySelector(".js-delete").classList.add("hide");
        getAllAdminstrators();

});


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

function editAdministrator(administratorId) {
        let voornaam = document.querySelector(".js-fname-update").value
        let achternaam = document.querySelector(".js-lname-update").value
        let email = document.querySelector(".js-email-update").value
        console.log(voornaam, achternaam, email)

        fetch(`/api/administrator/${administratorId}`, {
                method: 'PATCH',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        voornaam: voornaam,
                        achternaam: achternaam,
                        email: email
                })

        })
            .then(response => response.json())
            .then(data => {
                    console.log(data);
            })
}

function getAdmin(administratorId) {
        fetch(`/api/administrator/${administratorId}`, {
                method: 'GET',
                headers: {
                        'Accept': 'application/json'
                }
        })
            .then(response => response.json())
            .then(administrator => showAdminEditPopup(administrator))
}

function showAdminEditPopup(administrator) {
        console.log(administrator)
        const editAdministratorPopup = document.querySelector(".js-edit");
        editAdministratorPopup.innerHTML =
            `
         <img class="js-cross-image cross-image" src="../static/images/cross.svg">
         <h1>Bewerken</h1>
         <label for="fname-update">Voornaam:</label>
         <input class="js-fname-update" id="fname-update" type="text" value=${administrator.voornaam}>
         <label for="lname-update">Achternaam:</label>
         <input class="js-lname-update" type="text" value=${administrator.achternaam} id="lname-update">
         <label for="email-update">Email:</label>
         <input class="js-email-update" type="text" value=${administrator.email} id="email-update">
         <button data-admin-id="${administrator['beheerder_id']}"class="div-edit-button action-button js-popup-edit-button" type="submit">Bewerken<img class="action-img" src="../static/images/edit-icon-2.png"></button>
            `;

        document.querySelector(".js-popup-edit-button").addEventListener("click", () =>
{
        const popupEditButton = document.querySelector(".js-popup-edit-button")
        const adminId = popupEditButton.dataset.adminId
        editAdministrator(adminId);
        getAllAdminstrators();
        closePopUp()
})
         // closing pop up
        document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                crossImage.addEventListener("click", closePopUp)
                        console.log("yuh");
                })

        function closePopUp () {
                document.querySelector(".js-background").classList.add("hide");
                document.querySelector(".js-add").classList.add("hide");
                document.querySelector(".js-details").classList.add("hide");
                document.querySelector(".js-edit").classList.add("hide");
                document.querySelector(".js-delete").classList.add("hide");
        }
        }

// delete administrator
function deleteAdministrator(administratorId) {
        fetch(`/api/administrator/${administratorId}`,{
                method: 'DELETE',
                headers: {
                        'content-type':'application/json'
                }
        })
            .then (response => response.json())
            .then (data => console.log(data));



}

function getAdminForDelete (administratorId) {
        fetch(`/api/administrator/${administratorId}`, {
                method: 'GET',
                headers: {
                        'Accept': 'application/json'
                }
        })
            .then(response => response.json())
            .then(administrator => showAdminDeletePopup(administrator))
}

function showAdminDeletePopup (administrator) {
        const deleteAdministratorPopup = document.querySelector(".js-delete")
        deleteAdministratorPopup.innerHTML =
            `
        <img class="js-cross-image cross-image" src="../static/images/cross.svg"> 
        <h1>Verwijderen</h1>
        <p>Naam: ${administrator.voornaam}</p>
        <p>E-mailadres: ${administrator.email}</p>
        <button data-admin-id="${administrator['beheerder_id']}" class="js-delete-button div-delete-button action-button" type="submit">Verwijderen<img class="action-img" src="../static/images/bin-icon.png"></button>
            `;

        document.querySelector(".js-delete-button").addEventListener("click", () =>
        {
                const popupDeleteButton = document.querySelector(".js-delete-button")
                const adminId = popupDeleteButton.dataset.adminId
                deleteAdministrator(adminId);
                closePopUp();
        })

         // closing pop up
        document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                crossImage.addEventListener("click", closePopUp)
                        console.log("yuh");
                })

        function closePopUp () {
                document.querySelector(".js-background").classList.add("hide");
                document.querySelector(".js-add").classList.add("hide");
                document.querySelector(".js-details").classList.add("hide");
                document.querySelector(".js-edit").classList.add("hide");
                document.querySelector(".js-delete").classList.add("hide");
        }


 document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                crossImage.addEventListener("click", closePopUp)
                        console.log("yuh");
                })

        function closePopUp() {
                document.querySelector(".js-background").classList.add("hide");
                document.querySelector(".js-add").classList.add("hide");
        }

}

