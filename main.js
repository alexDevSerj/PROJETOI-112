var prediction1 = "";

Webcam.set({
    width: 350,
    height:300,
    imageFormat:'png',
    pngQuality: 90
})

var camera =document.getElementById("camera")
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturada" src="'+data_uri+'"/>'
    })
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Q3eRDnL5C/model.json',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "a primeira previsão é:"+prediction1;

    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis)
}
    

function check(){
    img = document.getElementById("capturada");
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
if(error){
    console.error(error)
}
else{
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    prediction1 = results[0].label;
    speak();
    if(results[0].label == "legal"){
        document.getElementById("updateEmoji").innerHTML = "👍"
    }
    if(results[0].label == "viròria"){
        document.getElementById("updateEmoji").innerHTML = "✌"
    }
    if(results[0].label == "tudo tranquilo"){
        document.getElementById("updateEmoji").innerHTML = "🤙"
    }
}
}