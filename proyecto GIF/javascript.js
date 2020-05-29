let apikey = "E0cBlcFOPYpOYjNNhMUxeSdfUYFqf3lI";
let button = document.getElementsByClassName("fourth")[0];
let boton = document.getElementById("fourth");
let man = document.getElementsByClassName("botones")[0]
let searchinput = document.querySelector("input");
let divsearch = document.getElementById("searchgif");
let recomendeddiv = document.getElementById("recomendedinput");

//ARRAYS    
let searcharrays = [];
const sugerenciasmias = ["tenis", "futbol", "arctic monkeys", "nba", "seinfeld", "friends", "family guy", "american dad", "rick and morty", "rock", "oasis", "historia", "deportes", "formula 1", "tecnologia", "peliculas", "actores", "programacion", "fotografia", "ciudades", "autos"]
//
getrandomgif();

function createsimages(datos, index) {
    let contenedor = document.getElementById("principalgifs"),
    creatediv = document.createElement("div");
    createimage = document.createElement("img");
    creatediv.setAttribute("class", "images");
    contenedor.appendChild(creatediv);
    creatediv.appendChild(createimage);
    createimage.src= datos.data[index].images.downsized.url;
}

//funciones para crear botones dinamicos
function arrayelements(Element) {
    let contenedor = document.getElementById("header");
        let createbutton = document.createElement("button");
        //let createbuttonP = document.createElement("p");
        createbutton.setAttribute("class", "botones");
        createbutton.setAttribute("onclick", "searchbuttonp()");
        createbutton.onclick = searchbuttonp;
        contenedor.appendChild(createbutton);
        //createbutton.appendChild(createbuttonP);
        createbutton.innerHTML= Element;
        searcharrays.shift();
}


async function searchbuttonp(event) {
     for (let index = 0; index < 16; index++) {
                document.querySelector(".images").remove();
         }
        let newman = event.target.textContent;
        divsearch.innerHTML= "tu busqueda es" +" ("+newman+")";
        let url= "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + newman + "&limit=25&offset=0&rating=G&lang=en";
        const resp = await fetch(url);
        const datos = await resp.json();
        //console.log("datossearchbutton", datos)
        for (let index = 0; index < 16; index++) {
        createsimages(datos,index)
        
    }};


function enablesearchboton(){
    if(searchinput.value.length !== 0){
        boton.removeAttribute("disabled");
    } if (searchinput.value.length == 0) {
        boton.setAttribute( "disabled", "");
    } 
}

searchinput.addEventListener("input",enablesearchboton);

boton.addEventListener("click",function() {
    for (let index = 0; index < 16; index++) {
        document.querySelector(".images").remove();
    }
        getsearchresult(); 

    if (searcharrays.length < 6) {
        let values = document.getElementById("texto").value; 
        searcharrays.unshift(values);
        localStorage.setItem("valores", JSON.stringify(searcharrays)); 
        }
        else{
            searcharrays.pop();
        }
        console.log(searcharrays);
        searcharrays.forEach(arrayelements);
})
//funciones para crear botones dinamicos



console.log(document.getElementById("header"));



//FUNCION SUGERENCIAS

function createsugimg(datos, busqueda) {
    
    let divsug = document.createElement("div");
    let in_div_sug = document.createElement("div");
    let createbutton_div = document.createElement("button");
    let sug = document.createElement("img");
        createbutton_div.innerHTML = "ver mas";
        createbutton_div.value = busqueda;
        createbutton_div.onclick = vermasbutton;
        in_div_sug.className = "divsug"
        divsug.id = "containersug";
        divsug.appendChild(sug);
        divsug.appendChild(in_div_sug);
        divsug.appendChild(createbutton_div);
        sug.className= "sug";
        sug.src = datos.data[0].images.downsized.url;
        in_div_sug.innerHTML = "#" + busqueda;
        document.getElementById("sugerencias").insertBefore(divsug, document.getElementById("first"));
}

async function vermasbutton(event){
    for (let index = 0; index < 16; index++) {
        document.querySelector(".images").remove();
    }
    const search = event.target.value;
    divsearch.innerHTML = "tu busqueda es" + "("+search+")";
    url = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + search +  "&limit=25&rating=G&lang=en"
    const resp = await fetch(url);
    const datos = await resp.json();
    for (let index = 0; index < 16; index++) {
        createsimages(datos, index);
     }
}


function indicerandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

window.onload = async function randomresult(){
    for (let index = 0; index < 4; index++) {
    var number = indicerandom(0,20);
    //console.log(number);
    let busqueda = sugerenciasmias[number];   
    //console.log("busqueda" + busqueda); 
    let url= "https://api.giphy.com/v1/gifs/search?api_key=E0cBlcFOPYpOYjNNhMUxeSdfUYFqf3lI&q=" + busqueda +"&limit=1&rating=G&";
    const resp = await fetch(url);
    const datos = await resp.json();
    //console.log("url",url);
    //console.log("datos", datos); 
     createsugimg(datos, busqueda);
    }
}

//FUNCION OBTENER GIF RANDOM

async function getrandomgif(){
        let url = "https://api.giphy.com/v1/gifs/trending?api_key=" + apikey + "&limit=20&rating=G";
        const resp = await fetch(url);
        const datos = await resp.json();
        //console.log("url", url);
        //console.log("datos", datos);
        for (let index = 0; index < 16; index++) {
            createsimages(datos, index);
        }  
}
//FUNCION SEARCH GIF

async function getsearchresult() {
    //console.log(search);
    let search2 = document.getElementById("texto").value;
    divsearch.innerHTML = "tu busqueda es" + " ("+search2+")";
    let url= "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + search2 + "&limit=25&offset=0&rating=G&lang=en";
    const resp = await fetch(url);
    const datos = await resp.json();
    //console.log("url",url);
    //console.log("datos",datos);
    //return datos;
    for (let index = 0; index < 16; index++) {
       createsimages(datos, index);
    }
    searchinput.value = "";
}

 console.log(document.getElementById("principalgifs"));

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

//funcion para div con recomendaciones

let divdesug = document.getElementById("sugerencias");
let divdegifs = document.getElementById("principalgifs");

searchinput.addEventListener("input", function() {
    if (searchinput.value.length >= 3 && searchinput.value.length <=6 ) {
        return;
    }

    sugerenciasmias.forEach((element, idx) => {  
      const sugerenciaEl = document.getElementById(idx);
      let indice = element.indexOf(searchinput.value);
      if (searchinput.value !== "" && indice !== -1) {
        
          sugerenciaEl.style.display = "block";
          
            
      } else {
        
          sugerenciaEl.style.display = "none";
      }
    });
  });

searchinput.addEventListener("input", function(){
    if(searchinput.value !== ""){
        divdesug.style.zIndex = -1;
    }else{
        divdesug.style.zIndex = 1;
    }
})  


function sugerenciasarray(){
     for (let index = 0; index < sugerenciasmias.length; index++) {
         const element = sugerenciasmias[index];
         crearsugerenciasarray(index,element);
     }
}
sugerenciasarray();

async function searchsugerenciasboton(event){
    for (let index = 0; index < 16; index++) {
        document.querySelector(".images").remove();
    };
    const value = event.target.textContent;
    divsearch.innerHTML = "tu busqueda es" + " ("+value+")";
    let url = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + value +  "&limit=25&rating=G&lang=en";
    const resp = await fetch(url);
    const datos = await resp.json();
    for (let index = 0; index < 16; index++) {
        createsimages(datos, index);
     }
     searchinput.value = "";
     enablesearchboton();
}

function crearsugerenciasarray(index, element){
    let crear = document.createElement("button");
         crear.setAttribute("class", "recomendados");
         crear.onclick = searchsugerenciasboton;
        crear.id = index;
        document.getElementById("recomendedinput").appendChild(crear);
        crear.innerHTML = element; 
}



 document.querySelectorAll(".recomendados").forEach((element) => {
         element.addEventListener("click", function() {
             document.querySelectorAll(".recomendados").forEach(element => {
                element.style.display = "none";
                  divdesug.style.zIndex = 1;
             });
         })
     });

