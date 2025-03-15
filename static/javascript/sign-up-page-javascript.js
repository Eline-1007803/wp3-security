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

document.querySelector('.js-birthdate-input').addEventListener('change', () =>
{
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
        if (ageInYears < 18) {
            document.querySelector('.js-supervisor-info').classList.remove('hide');
}
})



function saveSignup () {
    let fname = document.querySelector('.js-first-name-input').value
    let infix = document.querySelector('.js-infix-input').value
    let lname = document.querySelector('.js-last-name-input').value
    let password = document.querySelector('.js-password-input').value
    let zipcode = document.querySelector('.js-zip-code-input').value
    let gender = document.querySelector('.js-gender-input').value
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
    let emailParent = document.querySelector('.js-supervisor-email-input').value
    let preferredApproach = document.querySelector('.js-preferred-approach-input').value
    let researchType = document.querySelector('.js-researchtype-input').value
    let availability = document.querySelector('.js-availability-input').value

    console.log(fname, lname, zipcode, nameSupervisor, researchType)
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
            email_parent: emailParent,
            preferred_approach: preferredApproach,
            research_type: researchType,
            availability: availability})

        })
            .then(response => response)
            .then(data => {
                console.log(data);
            });
}

document.querySelector(".js-submit-button").addEventListener("click", saveSignup);


let fname = document.querySelector('.js-first-name-input').value
    let infix = document.querySelector('.js-infix-input').value
    let lname = document.querySelector('.js-last-name-input').value
    let password = document.querySelector('.js-password-input').value
    let zipcode = document.querySelector('.js-zip-code-input').value
    let gender = document.querySelector('.js-gender-input').value
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
    let emailParent = document.querySelector('.js-supervisor-email-input').value
    let preferredApproach = document.querySelector('.js-preferred-approach-input').value
    let researchType = document.querySelector('.js-researchtype-input').value
    let availability = document.querySelector('.js-availability-input').value
    let errormessage = document.querySelector('.js-error-message')

document.querySelector(".sign-up-form").addEventListener("submit", () => {

    if (fname === '' || fname === null){
        errormessage.innerHTML = 'vul uw voornaam in'
    }
})