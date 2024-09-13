/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let formHasNoErrors = true

function isFormValid()
{
    formHasNoErrors = true
    
    if (document.getElementById("name").value.length === 0)
    {
        //nothing has been entered
        document.getElementById("nameErrorMessage").innerHTML = "Please enter a name"
        document.getElementById("name").style.border = "1px solid red"
        document.getElementById("nameErrorMessage").style.color = "red"
        formHasNoErrors = false
    }   
    else
    {
        document.getElementById("nameErrorMessage").innerHTML = ""
        document.getElementById("name").style.border = "1px solid black"
    }
    if (document.getElementById("address").value.length === 0)
    {
        document.getElementById("addressErrorMessage").innerHTML = "Please enter an address"
        document.getElementById("address").style.border = "1px solid red"
        document.getElementById("addressErrorMessage").style.color = "red"
        formHasNoErrors = false
    }
    else
    {
        document.getElementById("addressErrorMessage").innerHTML = ""
        document.getElementById("address").style.border = "1px solid black"
    }
    
    if (formHasNoErrors)
    {
        return true
    }
    else
    {
        return false
    }
}
