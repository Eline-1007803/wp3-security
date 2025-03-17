function login () {
    let email = document.querySelector(".js-login-email-input").value
    let password = document.querySelector(".js-login-password-input").value


    console.log(email, password)
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email, "password": password})
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

document.querySelector(".js-submit-button").addEventListener("click", login)


