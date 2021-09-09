var song = " "; 
objects_detected = [ ];

var status = " "; 

function preload(){
    song = loadSound("old_telephone.mp3");
}

function draw(){
    image(video, 0, 0, 400, 400);

    if(status != " "){
    r = random(255); 
    g = random(225);
    b = random(255);

    objectDetection.detect(video, gotResult); 

    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Object detected"; 
        fill(r, g, b);

        var percent = floor(objects[i].confidence * 100); 
        text(objects[i].label + " " + percent + "%, ", objects[i].x + 20, objects[i].y + 20);

        noFill();
        stroke(r, g, b); 

        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person"){
        document.getElementById("status").innerHTML = "Status: Object detected"; 
        document.getElementById("number_of_objects").innerHTML = "Baby found!";
        song.stop(); }

        else{
            document.getElementById("number_of_objects").innerHTML = "Baby not found!";
        song.play(); }
    }

    if(objects.length = 0){
        document.getElementById("number_of_objects").innerHTML = "Baby not found!";
        song.play();
    }
  } 
}

function setup(){ 
    canvas = createCanvas(400, 400); 
    canvas.center();

    video = createCapture(400, 400);
    video.hide(); 

    objectDetection = ml5.objectDetector("cocossd", modelLoaded); 
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model loaded!");
    var status = "true";
} 

function gotResult(error, results){
    if(error){
        console.log(error); 
    }

    else{
        console.log(results);
        objects = results;
    }
} 