var update_modal = document.getElementById("update_modal");

var update_btn = document.getElementById("update_button");

var span_for_update_modal = document.getElementsByClassName("close_updatemodal")[0];

update_btn.onclick = function() {
  update_modal.style.display = "block";
}

span_for_update_modal.onclick = function() {
  update_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == update_modal) {
    update_modal.style.display = "none";
  }
}


var user_modal = document.getElementById("users_modal");

var users_btn = document.getElementById("users_button");

var span_for_user_modal = document.getElementsByClassName("close_usersmodal")[0];

users_btn.onclick = function() {
  user_modal.style.display = "block";
}

span_for_user_modal.onclick = function() {
  user_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == user_modal) {
    user_modal.style.display = "none";
  }
}