/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
// if you have 2 statements on one line, add ; between
//let x = 20
//let y = 30 
//let total = x + y

//declare multiple variables
let x = 20,
    y = 30,
    total = x + y

console.log(`x + y = ${total}`)

// default values (passed in a function)
function setCountry(country = "Ireland") {
    console.log(`Country is: ${country}`)
}

//popup
// let yourCountry = prompt("Enter your country: ")

//read from the HTML input
// console.log(document.getElementById("yourCounty").value) // how I find the value in the input

setCountry()

function chooseCountry() {
    let yourCountry = document.getElementById("yourCounty").value

    setCountry(yourCountry)
}



