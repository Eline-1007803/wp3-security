//filter searchbar
let administratorsList = [];
let interval;

document.querySelector('.js-searchbar').addEventListener('input', e => {
        clearInterval(interval);

        const value = e.target.value.toLowerCase();

        if (value === '') {
                interval = setInterval(getAllAdminstrators, 5000);
        }

        console.log(value);
        const filteredAdministrators = administratorsList.filter((administrator) => {
                if (administrator.email.includes(value)) {
                        return true;
                }

                const name = `${administrator.voornaam} ${administrator.tussenvoegsel} ${administrator.achternaam}`;
                console.log('naam: ', name);
                return name.toLowerCase().includes(value.toLowerCase());
        })

        showAdministrator(filteredAdministrators);
});

// get all administrators
function getAllAdminstrators()
{
        fetch('/api/administrators', {
                method: 'GET',
                headers: {
                        'Accept': 'application/json'
                }
        })
            .then(response => response.json())
            .then(administrators => {
                    administratorsList = administrators;
                    showAdministrator(administrators)
            })
}

getAllAdminstrators();
interval = setInterval(getAllAdminstrators, 5000);


// Add button pop up
document.querySelectorAll(".add-administrator-button")
    .forEach(addButton => {
                addButton.addEventListener("click", ()=> {
                        console.log('yaas');
                        document.querySelector(".js-background").classList.remove("hide");
                        document.querySelector(".js-add").classList.remove("hide");


        });
    })

// showing each administrator on page
function showAdministrator (administrators) {
        document.querySelector(".js-administrator-table").innerHTML = '';
        administrators.forEach((administrator) => {
                console.log(administrator)
                let fullName = administrator.tussenvoegsel ? `${administrator.voornaam} ${administrator.tussenvoegsel} ${administrator.achternaam}` : `${administrator.voornaam} ${administrator.achternaam}`;
                let row =
                    `
                <tr>
                    <td>${fullName}</td>
                    <td>${administrator.email}</td>
                  
             
                    <td>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button details-button">Details

                        </button>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button edit-button">Bewerken
                     
                        </button>
                        <button data-admin-id="${administrator['beheerder_id']}" class="action-button delete-button">Verwijderen
                        </button>
                    </td>
                </tr>
                `
                document.querySelector(".js-administrator-table").innerHTML += row;

        //dark-mode ook bij refreshen
        if (document.body.classList.contains("dark-mode")) {
                document.querySelectorAll("table, th, td").forEach(element => {element.classList.add("dark-mode");})
        }

        });

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
        <div class="details-class">
                <img class="js-cross-image cross-image" src="../static/images/cross.svg">
                <h1 class="details-header">Details</h1>
                <div class="details">
                        <p>Naam:${administrator.voornaam}</p>
                        <p>Email: ${administrator.email}</p>
                        <p>Telefoonnummer: ${administrator.telefoonnummer}</p>
                </div>
               
        </div>
        
       
                
        `;

        // closing pop up
        document.querySelectorAll(".js-cross-image")
            .forEach(crossImage => {
                        crossImage.addEventListener("click", closePopUp);
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
        let password = document.querySelector('.js-password-input').value

        console.log(fname, lname, email, password);

        fetch('/api/new-administrator', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({fname: fname, lname: lname, email: email, password: password})
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
         <div class="button-container">
            <button data-admin-id="${administrator['beheerder_id']}"class="div-edit-button action-button js-popup-edit-button" type="submit">Bewerken</button>
         </div>
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
        <div class="delete-class">
                <img class="js-cross-image cross-image" src="../static/images/cross.svg"> 
                <h1>Verwijderen</h1>
                <div class="delete">
                        <p>Naam: ${administrator.voornaam}</p>
                        <p>E-mailadres: ${administrator.email}</p>
                        <p>Telefoonnummer: ${administrator.telefoonnummer}</p>
                <div>
                <button data-admin-id="${administrator['beheerder_id']}" class="js-delete-button div-delete-button action-button" type="submit">Verwijderen</button>
        </div>
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


         document.querySelectorAll(".js-cross-image").forEach(crossImage => {
                        crossImage.addEventListener("click", closePopUp)
                                console.log("yuh");
                        })
}

function closePopUp () {
        document.querySelector(".js-background").classList.add("hide");
        document.querySelector(".js-add").classList.add("hide");
        document.querySelector(".js-details").classList.add("hide");
        document.querySelector(".js-edit").classList.add("hide");
        document.querySelector(".js-delete").classList.add("hide");
}
