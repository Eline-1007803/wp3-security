function refresh_deskundigen(data) {
  let deskundigen_collection = document.getElementById('deskundigen');
  deskundigen_collection.innerHTML = '';

  // Ik doe de aanname dat de data een lijst is van onderzoeksaanvragen
  let deskundigen = data.deskundigen;
  let deskundigen_html = '';
  for (let i = 0; i < deskundigen.length; i++) {
      let deskundigenElement = deskundigen[i];

      // Javascript kent Python-achtige "f" strings, waarin je variabelen kan vervangen
      // Die lappen HTML plak ik achter elkaar in de nu lege deskundigen_html
      deskundigen_html += `
                <tr>
                    <td>${deskundigenElement.voornaam}</td>
                    <td>${deskundigenElement.leeftijd}</td>
                    <td>${deskundigenElement.naam}</td>
                </tr>
      `;
      // En uiteindelijk plak ik de hele HTML string in het element met id 'deskundigen'
      deskundigen_collection.innerHTML = deskundigen_html;
  }
}


function get_deskundigen() {
    fetch('/api/deskundigen')
        .then(response => response.json())
        .then(refresh_deskundigen);
}

get_deskundigen();

setInterval(get_deskundigen, 3000)




// var modal = document.getElementById("myModal");
// var btn = document.getElementById("myBtn");
// var btn2 = document.getElementById("myBtn2");
// var btn3 = document.getElementById("myBtn3");
// var span = document.getElementsByClassName("close")[0];
//
// btn.onclick = function() {
//   modal.style.display = "block";
// }
//
// btn2.onclick = function() {
//   modal.style.display = "block";
// }
//
// btn3.onclick = function() {
//   modal.style.display = "block";
// }
//
// span.onclick = function() {
//   modal.style.display = "none";
// }
//
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }