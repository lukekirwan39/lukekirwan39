let formHasNoErrors = true
let formWasSubmittedAtLeasrOnce = false

/* Each input element that needs to be validated needs its own validation function */
function isNameValid()
{
    if(!formWasSubmittedAtLeastOnce)
    {
        return false
    }
    
    let errorMessage = ""
    // test to see if the name is not empty
    if (document.getElementById("name").value.length === 0)
    {
        errorMessage += "Please enter a name"
    }

    // passed all tests, so it is a valid name
    document.getElementById("nameErrorMessage").innerHTML = errorMessage
    return (errorMessage.length === 0)
}

function isAddressValid()
{
    let errorMessage = ""
    // test to see if the address is not empty
    if (document.getElementById("address").value.length !== 0)
    {
        errorMessage += "Please enter an address"
    }
    if(document.getElementById("address").value.indexOf("\n") === -1)
    {
        errorMessage += "<div>Address must contain at aleast two address lines</div>"
    }

    // passed all tests, so it is a valid address
    document.getElementById("addressErrorMessage").innerHTML = errorMessage
    return (errorMessage.length === 0)
}

function isPhoneValid()
{
    let errorMessage = "";
    //console.log(docunment.getElementById("phone"))
    if (document.getElementById("Phone").value.length !== 7)
    {
        errorMessage += "Phone number must be seven digits long"
    }

    let pattern = /ˆ\d+$/
    if(pattern.test(document.getElementById("address").value) === false)
    {
        errorMessage += "<div>Phone number can only contain digits</div>"
    }

    //passed all tests, so it is a valid name
    document.getElementById("PhoneErrorMessage").innerHTML = errorMessage
}
/************************************************************************************/


/* The form needs one main wrapper function that will call each of the input element validation functions above */
function isFormValid()
{
    /* Validate all of the input elements */
    let nameIsValid = isNameValid()
    let addressIsValid = isAddressValid()

    /* If ALL of the element validation functions pass, then the form is valid */
    if (nameIsValid && addressIsValid)
    {
        return true
    }
    else /* If ANY of the element validation functions fail, then the form fails */
    {
        return false
    }
}
