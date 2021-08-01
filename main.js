//Creating img variable to store the image
img = "";
//Creating a variable status to check and store the same
status = "";
objects = [];


function preload(){
    //Loading the image in the img variable 
   img = loadImage("dog_cat.jpg")
}

function setup(){
    //Creating the canvas and setting its height and width
    canvas = createCanvas(640 , 420);
    // Aligning the canvas to the center
    canvas.center();
    //Loading the cocossd model with the objectDetect function
    odjectDetect = ml5.objectDetector("cocossd", modelLoaded)
    //Setting the status to detecting objects
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    //Checking if the model is loaded and then displaying in console
    console.log("Model Loaded!")
    // Setting the status variable to true
    status = true;
    //getting the results of the model
    odjectDetect.detect(img, gotResult)
}

function gotResult(error , results){
    if(error){
        console.error(error)
    } else {
        console.log(results)
        objects = results;
    }
}


function draw()
{

    image(img, 0, 0, 640, 420)

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y - 25, objects[i].width , objects[i].height)
        }
    }
    
}