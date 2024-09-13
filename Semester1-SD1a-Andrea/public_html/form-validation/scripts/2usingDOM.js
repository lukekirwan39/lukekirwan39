/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


function changeText()
{
    // change text based on user input
    // connect to both elements (span and input)
    let span = document.getElementById("output")
    //console.log(span)
    let textbox = document.getElementById("textbox")
    console.log(textbox)
    
    //get the value from the textbox    
    //output into the span
    span.innerHTML = textbox.value
    textbox.style.color = "red"
    textbox.style.border = "1px solid red"
}