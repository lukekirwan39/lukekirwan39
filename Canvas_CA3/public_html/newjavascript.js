/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
let canvas = null
let ctx = null
let offscreenCanvas = null;
let offscreenCanvasCtx = null; 
let imageWidth = 100
let imageHeight = 100
let imageX = 250
let imageY = 250
let img = new Image()
img.src = "images/sunrise.jpg"
let img2 = new Image()
img2.src = "images/paint.png"

let radius = 10

let imageCanvas
let imageCanvasG

let foregroundCanvas
let foregroundCanvasG

let scribbleCanvas
let scribbleCanvasCtx

let originalImage = null
let imageData = null
let data = null

let brightnessLevelRed = 0
let brightnessLevelGreen = 0
let brightnessLevelBlue = 0

const lineHeight = 30;
let text;

let grayScale = false

let rotationDegrees

let images = [
    {src: img, x: 100, y: 100, width: 100, height: 100, rotation: 0, greyscale: false, brightness: 0},
    {src: img2, x: 200, y: 200, width: 100, height: 100, rotation: 0, greyscale: false, brightness: 0}]

let currentImageIndex = 0

let offsetX = 0
let offsetY = 0

window.onload = onAllFunctionsLoaded
document.write("<div id='loadingMessage'>Loading...</div>")
function onAllFunctionsLoaded()
{
    //hide the webpage loading message
    document.getElementById("loadingMessage").style.visibility = "hidden"
    
    canvas = document.getElementById("lk_canvas")
    ctx = canvas.getContext("2d")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    
    offscreenCanvas = document.createElement('canvas');
    offscreenCanvasCtx = offscreenCanvas.getContext('2d');
    offscreenCanvas.width = canvas.clientWidth
    offscreenCanvas.height = canvas.clientHeight
    
    imageCanvas = document.createElement('canvas')
    imageCanvasG = imageCanvas.getContext('2d')
    imageCanvas.width = canvas.clientWidth
    imageCanvas.height = canvas.clientHeight
    
    scribbleCanvas = document.createElement('canvas')
    scribbleCanvasCtx = scribbleCanvas.getContext('2d')
    scribbleCanvas.width = canvas.clientWidth
    scribbleCanvas.height = canvas.clientHeight
    
    scribbleCanvasCtx.fillStyle = "red"
    document.getElementById("lk_colourPicker").value = "#ff0000"
    
    renderCanvas()
    
    canvas.addEventListener('mousedown', mousedownHandler)
    canvas.addEventListener('mousemove', moveHandler)
    canvas.addEventListener('wheel', mousewheelHandler)
//    window.onmousewheel = document.onmousewheel = mousewheelHandler
    
    setRotationDegrees(document.getElementById("lk_rotationRange"))
    
}

let brightnessLevel = 0
function renderCanvas()
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                images.map((image, index) => {
                    offscreenCanvasCtx.clearRect(0, 0, canvas.width, canvas.height)

                    // highlight current image
                    if (index === currentImageIndex)
                    {
                        offscreenCanvasCtx.fillStyle = "red"
                        offscreenCanvasCtx.fillRect(image.x - 2, image.y - 2, image.width + 4, image.height + 4)
                    }

                    // draw image
                    offscreenCanvasCtx.drawImage(image.src, image.x, image.y, image.width, image.height)


                    // greyscale
                    if (image.greyscale)
                    {
                        // get the pixels from the canvas
                        imageData = offscreenCanvasCtx.getImageData(image.x, image.y, image.width, image.height)

                        for (let i = 0; i < imageData.data.length; i += 4)
                        {

                            let grayscale = (imageData.data[i + 0] + imageData.data[i + 1] + imageData.data[i + 2]) / 3

                            imageData.data[i + 0] = grayscale
                            imageData.data[i + 1] = grayscale
                            imageData.data[i + 2] = grayscale
                            imageData.data[i + 3] = 255
                        }

                        offscreenCanvasCtx.putImageData(imageData, image.x, image.y)
                    }


                    // brightness
                    imageData = offscreenCanvasCtx.getImageData(image.x, image.y, image.width, image.height)

                    for (let i = 0; i < imageData.data.length; i += 4)
                    {
                        imageData.data[i + 0] = imageData.data[i + 0] + image.brightness
                        imageData.data[i + 1] = imageData.data[i + 1] + image.brightness
                        imageData.data[i + 2] = imageData.data[i + 2] + image.brightness
                        imageData.data[i + 3] = 255
                        
                        imageData.data[i + 0] = imageData.data[i + 0] + brightnessLevelRed
                        imageData.data[i + 1] = imageData.data[i + 1] + brightnessLevelGreen
                        imageData.data[i + 2] = imageData.data[i + 2] + brightnessLevelBlue
                        imageData.data[i + 3] = 255
                    }

                    offscreenCanvasCtx.putImageData(imageData, image.x, image.y)


                    // rotate image
                    ctx.save()
                    ctx.translate((image.x + image.width / 2), (image.y + image.height / 2))
                    ctx.rotate(Math.radians(image.rotation))
                    ctx.translate(-(image.x + image.width / 2), -(image.y + image.height / 2))


                    // Draw the manipulated offscreen image onto the display canvas
                    ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height)
                    ctx.restore()
                })
            }

function mousewheelHandler(e)
{
    if (currentImageIndex !== null)
    {
        let canvasBoundingRectangle = canvas.getBoundingClientRect()
        mouseX = e.clientX - canvasBoundingRectangle.left
        mouseY = e.clientY - canvasBoundingRectangle.top
        //  if (mouseIsInsideImage(imageX, imageY, imageWidth, imageHeight, mouseX, mouseY))
        {
            let oldCentreX = images[currentImageIndex].x + (images[currentImageIndex].width / 2)
            let oldCentreY = images[currentImageIndex].y + (images[currentImageIndex].height / 2)

            images[currentImageIndex].width += e.wheelDelta / 120
            images[currentImageIndex].height += e.wheelDelta / 120

            images[currentImageIndex].x = oldCentreX - (images[currentImageIndex].width / 2)
            images[currentImageIndex].y = oldCentreY - (images[currentImageIndex].height / 2)

            renderCanvas()
        }
    }
}


function mouseIsInsideImage(imageTopLeftX, imageTopLeftY, imageWidth, imageHeight, x, y)
{
    if ((x > imageTopLeftX) && (y > imageTopLeftY))
    {
        if (x > imageTopLeftX)
        {
            if ((x - imageTopLeftX) > imageWidth)
            {
                return false // to the right of the image
            }
        }

        if (y > imageTopLeftY)
        {
            if ((y - imageTopLeftY) > imageHeight)
            {
                return false // below the image
            }
        }
    }
    else // above or to the left of the image
    {
        return false
    }
    return true // inside image
}


function setRotationDegrees(newRotationDegrees)
{
    images[currentImageIndex].rotation = parseInt(newRotationDegrees)
    renderCanvas()
}


function setBrightness(newBrightness)
{
    images[currentImageIndex].brightness = parseInt(newBrightness)
    renderCanvas()
}

function toggleGreyscale(greyscaleIsSet)
{
    images[currentImageIndex].greyscale = greyscaleIsSet
    renderCanvas()
}

function mousedownHandler(e)
{
    if (e.which === 1)  // left mouse button
    {
        let canvasBoundingRectangle = canvas.getBoundingClientRect()
        mouseX = e.clientX - canvasBoundingRectangle.left
        mouseY = e.clientY - canvasBoundingRectangle.top

        currentImageIndex = null
        for (let i = images.length - 1; i > -1; i--)
        {
            if (mouseIsInsideImage(images[i].x, images[i].y, images[i].width, images[i].height, mouseX, mouseY))
            {
                offsetX = mouseX - images[i].x
                offsetY = mouseY - images[i].y
                currentImageIndex = i
                renderCanvas()

                // set the HTML inputs
//                document.getElementById("rotation").value = images[currentImageIndex].rotation
//                document.getElementById("brightness").value = images[currentImageIndex].brightness
//                document.getElementById("greyscale").checked = images[currentImageIndex].greyscale
                break
            }
        }
    }
}

function moveHandler(e)
{
    if ((currentImageIndex !== null) && (e.which === 1))  // left mouse button
    {
        let canvasBoundingRectangle = canvas.getBoundingClientRect()
        mouseX = e.clientX - canvasBoundingRectangle.left
        mouseY = e.clientY - canvasBoundingRectangle.top

        images[currentImageIndex].x = mouseX - offsetX
        images[currentImageIndex].y = mouseY - offsetY
        renderCanvas()
    }
}

Math.radians = function(degrees)
{
    return degrees * Math.PI / 180
}

function updateRGBLevel()
{
    brightnessLevelRed = parseInt(document.getElementById("lk_brightnessRed").value)
    brightnessLevelGreen = parseInt(document.getElementById("lk_brightnessGreen").value)
    brightnessLevelBlue = parseInt(document.getElementById("lk_brightnessBlue").value)
    renderCanvas()
}

function removeImage()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function addImage(images)
{
    ctx.drawImage(images, 100, 100, 100, 100)
}

function addText()
{
    ctx.fillStyle = "red"
    ctx.font = "100px Times Roman"
    ctx.fillText("Canvas", 150, 150)

    ctx.strokeStyle = "blue"
    ctx.font = "200px Arial"
    ctx.lineWidth = "10"
    ctx.strokeText("Canvas", 50, 350)
}
