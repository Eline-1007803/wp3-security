function CheckIn()
{
    var checkbox = document.getElementById("metbeloning");
    var label = document.getElementById("beloninglabel");
    var text = document.getElementById("beloning");

    if(checkbox.checked == true)
    {
        text.style.display = "block";
        label.style.display = "block";
    }
    else
    {
        text.style.display = "none";
        label.style.display = "none";

    }

}

function CheckLocatie()
{
    var type = document.getElementById("typeonderzoek").value;
    var label = document.getElementById("locatie_label");
    var text = document.getElementById("locatie_text");
    if(type == "locatie")
    {
        label.style.display = "block";
        text.style.display = "block";
    }
    else
    {
        label.style.display = "none";
        text.style.display = "none";
    }
}