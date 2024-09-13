/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let formHasNoErrors = true

/* Each input element that needs to be validated needs its own validation function */
function isNameValid()
{
    // test to see if the name is not empty
    if (document.getElementById("name").value.length === 0)
    {
        //nothing has been entered
        document.getElementById("nameErrorMessage").innerHTML = "Please enter a name"
        document.getElementById("name").style.border = "1px solid red"
        document.getElementById("nameErrorMessage").style.color = "red"
        errors = false
    } else
    {
        document.getElementById("nameErrorMessage").innerHTML = ""
        document.getElementById("name").style.border = "1px solid black"
        errors = true
    }

    return (errors)
}

function isAddressValid()
{
    if (document.getElementById("address").value.length === 0)
    {
        document.getElementById("addressErrorMessage").innerHTML = "Please enter an address"
        document.getElementById("address").style.border = "1px solid red"
        document.getElementById("addressErrorMessage").style.color = "red"
        errors = false
    } else
    {
        document.getElementById("addressErrorMessage").innerHTML = ""
        document.getElementById("address").style.border = "1px solid black"
        errors = true
    }

    return (errors)
}

/* The form needs one main wrapper function that will call each of the input element validation functions above */
function isFormValid()
{
    /* Validate all of the input elements */
    let nameIsValid = isNameValid() // calls the function above
    let addressIsValid = isAddressValid() // calls the function above

    /* If ALL of the element validation functions pass, then the form is valid */
    if (nameIsValid && addressIsValid)
    {
        return true
    } else /* If ANY of the element validation functions fail, then the form fails */
    {
        return false
    }
}
