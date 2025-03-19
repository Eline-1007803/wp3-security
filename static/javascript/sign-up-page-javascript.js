const checkbox = document.getElementById("supervisor-input");

// if supervisor checkbox is checked, show input fields
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

// supervisor questions automatically shows up when expert is under 18 and is required
document.querySelector('.js-birthdate-input').addEventListener('change', ageCheck)

function ageCheck ()
{
    const ageInYears = calculateAge();

        if (ageInYears < 18) {
            document.querySelector('.js-supervisor-info').classList.remove('hide');
            supervisorCheckbox = document.querySelector('.js-supervisor-input').checked = true;

        }

}

function calculateAge() {
    let birthdate = document.querySelector('.js-birthdate-input').value
    let dateParse = Date.parse(birthdate);
    let dateToday = Date.now();
    let ageInMilliseconds = dateToday - dateParse;
    console.log(ageInMilliseconds);

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    let ageInYears = Math.round(ageInMilliseconds / year);
    console.log(ageInYears);

    return ageInYears;
}


function saveSignup() {
    const fname = document.querySelector('.js-first-name-input').value
    let infix = document.querySelector('.js-infix-input').value
    let lname = document.querySelector('.js-last-name-input').value
    let password = document.querySelector('.js-password-input').value
    let zipcode = document.querySelector('.js-zip-code-input').value
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let email = document.querySelector('.js-email-input').value
    let phonenum = document.querySelector('.js-phonenum-input').value
    let birthdate = document.querySelector('.js-birthdate-input').value
    let tools = document.querySelector('.js-tools-input').value
    let introduction = document.querySelector('.js-introduction-input').value
    let details = document.querySelector('.js-details-input').value
    let agreementTerms = document.querySelector('.js-agreement-terms-input').value
    let supervisor = document.querySelector('.js-supervisor-input').value
    let nameSupervisor = document.querySelector('.js-supervisor-name-input').value
    let phonenumSupervisor = document.querySelector('.js-supervisor-phonenum-input').value
    let emailSupervisor = document.querySelector('.js-supervisor-email-input').value
    let preferredApproach = document.querySelector('.js-preferred-approach-input').value
    let researchType = document.querySelector('.js-researchtype-input').value
    let availability = document.querySelector('.js-availability-input').value


    const errormessage = document.querySelector('.js-error-message');
    const lnameMessage = document.querySelector('.js-lname-message');
    const passwordMessage = document.querySelector('.js-password-message');
    const zipcodeMessage = document.querySelector('.js-zipcode-message');
    const genderMessage = document.querySelector('.js-gender-message');
    const emailMessage = document.querySelector('.js-email-message');
    const phonenumMessage = document.querySelector('.js-phonenum-message');
    const birthdateMessage = document.querySelector('.js-birthdate-message');
    const disabilitiesMessage = document.querySelector('.js-disabilities-message');
    const termsAgreementMessage = document.querySelector('.js-agreement-terms-message');
    const nameSupervisorMessage = document.querySelector('.js-supervisor-name-message');

    let disabilityOptions = document.querySelector('.js-dropdown').selectedOptions;
    disabilityOptions = Array.from(disabilityOptions)

    const selectedDisabilities = [];
    disabilityOptions.forEach(option => {
        selectedDisabilities.push(option['value'])
    })

    console.log(fname)
    if (fname === '') {
        errormessage.innerHTML = 'Vul uw voornaam in';
        return;
    }
    if (lname === '') {
        lnameMessage.innerHTML = 'Vul uw achternaam in';
        return;
    }

    if (password === '') {
        passwordMessage.innerHTML = 'Vul uw wachtwoord in, deze moet minstens 8 karakters bevatten';
        return;
    }

    if (zipcode === '') {
        zipcodeMessage.innerHTML = 'Vul uw postcode in, 1234AB';
        return;
    }

    if (gender === '' || gender === null) {
        genderMessage.innerHTML = 'Kruis een geslacht aan'
        return;
    }

    if (email === '') {
        emailMessage.innerHTML = 'Vul uw emailadres in';
        return;
    }

    if (phonenum === '') {
        phonenumMessage.innerHTML = 'Vul uw telefoonnummer in';
        return;
    }

    if (birthdate === '' || birthdate === null) {
        birthdateMessage.innerHTML = 'Vul een geldige geboortedatum in';
        return;
    }


    if (selectedDisabilities < 1 || selectedDisabilities === null) {
        disabilitiesMessage.innerHTML = 'Klik uw type beperking aan';
        return;
    }
    if (agreementTerms === '' || agreementTerms === null) {
        termsAgreementMessage.innerHTML = 'Kruis aan dat u akkoord gaat met de voorwaarden';
        return;
    }

    const ageInYears = calculateAge();
    if (ageInYears < 18) {
        if (nameSupervisor === ''){
            nameSupervisorMessage.innerHTML = 'Vul hier de naam in van uw toezichthouder/voogd';
            return;

        }
        if (emailSupervisor === '') {
            emailSupervisorMessage.innerHTML = 'Vul hier het emailadres in van uw toezichthouder/voogd'
            return;
        }

        if (phonenumSupervisor === '') {
            phonenumSupervisorMessage.innerHTML = 'Vul hier het telefoonnummer in van uw toezichthouder/voogd'
            return;
        }

    }

    console.log(selectedDisabilities)

    let selectedGender = document.querySelector('input[name="gender"]:checked');
    console.log(selectedGender ? selectedGender.value : "No gender selected");



    fetch('/api/save-signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            fname: fname,
            infix: infix,
            lname: lname,
            password: password,
            zipcode: zipcode,
            gender: gender,
            email: email,
            phonenum: phonenum,
            birthdate: birthdate,
            tools: tools,
            introduction: introduction,
            details: details,
            agreement_terms: agreementTerms,
            supervisor: supervisor,
            name_supervisor: nameSupervisor,
            phonenum_supervisor: phonenumSupervisor,
            email_supervisor: emailSupervisor,
            preferred_approach: preferredApproach,
            research_type: researchType,
            availability: availability,
            disabilities: selectedDisabilities
        })

    })
        .then(response => response)
        .then(data => {
            console.log(data);
        });
}

document.querySelector(".js-submit-button").addEventListener("click", saveSignup);



function getAllDisabilities() {
    fetch('api/beperkingen-ophalen', {
        method: ['GET'],
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(disabilities => showDisabilities(disabilities))
}

getAllDisabilities()

function showDisabilities(disabilities) {
    const dropdown = document.querySelector('.js-dropdown');
    disabilities.forEach((disability) => {
        let dropdownElement = `
        <option value="${disability['beperking_id']}">${disability['naam']}</option>`
        dropdown.innerHTML += dropdownElement;
    });
}

/*function save_disabilities() {
let disabilities = document.querySelector('.js-dropdown').value;
fetch('/api/beperkingen-opslaan', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
'disability': disabilities
})
})
.then(response => response)
.then(data => {console.log(data)})
}

document.querySelector('.js-submit-button').addEventListener('click', save_disabilities)
*/