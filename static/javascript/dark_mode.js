function darkLightMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll("tbody, .popup-content, .column").forEach(element => {
        element.classList.toggle("dark-mode");
    });
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else { localStorage.setItem("darkMode", "disabled");}
    }

window.onload = function() {
    if (localStorage.getItem("darkMode") === "enabled") { document.body.classList.add("dark-mode");
        document.querySelectorAll("tbody, .popup-content, .column").forEach(element => {element.classList.add("dark-mode");
        })}
    };    