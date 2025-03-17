function login () {
    let email = document.querySelector(".js-login-email-input").value
    let password = document.querySelector(".js-login-password-input").value


    console.log(email, password)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email, "password": password})
    })
        .then(response => response.json())
        .then(data => {
            if (data['success'] === true) {
                window.location.href = '/';
            }

        })
}

document.querySelector(".js-submit-button").addEventListener("click", login);

