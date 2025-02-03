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