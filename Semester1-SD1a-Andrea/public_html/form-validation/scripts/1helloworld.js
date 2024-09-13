/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



function myFunction()
{
    // all the code you want to trigger in this function:
    let answer = confirm("Are you ok?")
    if (answer)
    {
        document.write("That's great!")
    } 
    else
    {
        let answer2 = prompt("Is there anything I could do?")
        document.write("You've said: " + answer2)
    }
}
