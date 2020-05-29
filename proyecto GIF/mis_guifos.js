let tecla = document.getElementsByClassName("first")[0];
tecla.addEventListener("click", function() {
    animatediv();

    let arrow = document.getElementById("arrow");
    arrow.style.display= "block";
    arrow.animate([
        {
            opacity: 0
        },
        {
            opacity: 1
        }
    ],
    {
        duration:1000,
    }
    )
    let container = document.getElementsByClassName("conteiner")[0];
    container.style.display= "block";
    container.animate([
        {
            opacity:0
        },
        {
            opacity:1
        }
    ],
    {
        duration: 1000,
    }
    )
})



let capturar = document.getElementById("capturar");
let listo = document.getElementById("listo");
let videos = document.getElementById("record");
let cancel = document.getElementById("cancel");
let send = document.getElementById("send");
let finish = document.getElementById("finish");
let contenedorvideo = document.getElementById("contenedor-video");

let start= document.getElementById("start");

start.addEventListener("click", function(e){
    video();
    document.getElementById("contenedor-video").style.display= "block";
    let contenedor = document.getElementsByClassName("conteiner")[0];
    contenedor.style.display= "none";
    animatediv();
    e.preventDefault();
    e.stopPropagation();
});

function video() {
    
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {width:684, height: 386}

    })
    .then(function (stream) {
        videos.srcObject = stream;
        videos.play();
        var recorder = RecordRTC(stream, {
            type:'gif',
            framerate: 1
        });
        capturar.addEventListener("click", function(e) {
            capturar.style.display= "none";
            listo.style.display= "block";
            recorder.startRecording();
            e.preventDefault();
            e.stopPropagation();
        });
        listo.addEventListener("click",function(e){
                recorder.stopRecording(function(){
                let blob = recorder.getBlob();
                console.log(blob);
                let form = new FormData();
                form.append('file',recorder.getBlob(), 'myGIF.gif');
                console.log(form.get('file'));
                const url = URL.createObjectURL(recorder.getBlob());
                console.log(url);
                listo.style.display = "none";
                cancel.style.display = "block";
                send.style.display = "block";
                e.preventDefault();
                e.stopPropagation();
                send.addEventListener("click",function(e){
                    fetch("https://upload.giphy.com/v1/gifs?api_key=E0cBlcFOPYpOYjNNhMUxeSdfUYFqf3lI&"+ url,{  
                      method: "POST",
                      body: form
                      
                    })
                      .then(res => res.json())
                      .then(response =>  { 
                        console.log(response.data.id);
                        let id = response.data.id;
                        getmygifs(id);
                    });
                      alert("estamos procesando tu Guif, espera 10 segundos");
                      setTimeout(function(){ document.getElementById("finish").style.display = "block"},10000);
                      send.style.display = "none";
                      cancel.style.display ="none";
                      e.preventDefault();
                      e.stopPropagation();
            });
                finish.addEventListener("click", function(e){
                    contenedorvideo.style.display = "none";
                    animatediv2();
                    mygifgalery();
                    finish.style.display = "none";
                    capturar.style.display = "block";
                    e.preventDefault();
                    e.stopImmediatePropagation();
                })
        });
        
    })
    })
    .catch(function(err){
        console.log(err);
    })
}


//funcion upload


async function getmygifs(id){
    let url = "https://api.giphy.com/v1/gifs/" + id + "?api_key=E0cBlcFOPYpOYjNNhMUxeSdfUYFqf3lI";
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log("datosmygif", datos);
    localStorage.setItem("mygif", datos.data.images.downsized.url);
   
};

let arrow = document.getElementById("arrow");

function mygifgalery(){ 
    const div = document.getElementById("guifos");   
    let createimage = document.createElement("div");
    let createimage2 = document.createElement("img");
    createimage.setAttribute("class", "mygif");
    div.appendChild(createimage);
    createimage.appendChild(createimage2);
    createimage2.src = localStorage.getItem("mygif");
}

function animatediv(){
    const div = document.getElementById("guifos");
    div.animate([
        { //from 
             transform: 'translateY(0px)'  
        },
        {//to
            transform:'translateY(400px)'
        }
    ],
    {//options
        duration:0,
        fill:'forwards'
    }
    );
}

function animatediv2(){
    const div = document.getElementById("guifos");
    div.animate([
        { //from 
             transform: 'translateY(0px)'  
        },
        {//to
            transform:'translateY(100px)'
        }
    ],
    {//options
        duration:0,
        fill:'forwards'
    }
    );
}

//estilos intercambiables

let arrowdropdown = document.getElementById("three");
let chosentheme = document.getElementById("second");
let dropdown = document.getElementById("dropdown");
let day = document.getElementById("day");
let night = document.getElementById("night");
let link = document.getElementsByTagName("link")[0];
let logo = document.getElementById("logo");

chosentheme.addEventListener("click", function(e){
    const display = dropdown.style.display;
    dropdown.style.display = display === 'none' ? 'block' : 'none';
    });


function day1() {
    link.href = "styles/styles1.css";
    logo.src =  "./images/gifOF_logo.png";
};
function night1() {
    link.href = "styles/styles2.css";
    logo.src = "./images/gifOF_logo_dark.png";
};

day.addEventListener("click", function(){
    day1();
});
night.addEventListener("click", function (){
    night1();
});

