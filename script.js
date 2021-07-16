function handleApi(){

    let word = palabras();

    let wordDom = document.querySelector('#random');
    wordDom.innerHTML = " Frase aleatoria : " + word;
    
    var x = document.getElementById("api1");
    var y = document.getElementById("api2");
    var z = document.getElementById("home");

    if(z.className === 'active'){
        y.className = 'notActive';
        x.className = 'notActive';
    }else{
        y.className = 'notActive';
        x.className = 'notActive';
        z.className = 'active'
    }
}

function handleApi1(){
    api1();

    var x = document.getElementById("api1");
    var y = document.getElementById("api2");
    var z = document.getElementById("home");

    if (x.className === 'active') {
        y.className = 'notActive';
        z.className = 'notActive';
    } else{
        x.className = 'active';
        y.className = 'notActive';
        z.className = 'notActive';

    }
}

function handleApi2(){
    api2();

    var x = document.getElementById("api1");
    var y = document.getElementById("api2");
    var z = document.getElementById("home");

    if (y.className === 'notActive') {
        x.className = 'notActive';
        y.className = 'active';
        z.className = 'notActive'
    }
}

function api1(){

    fetch('https://covid-api.mmediagroup.fr/v1/cases')
    .then(response => response.json())
    .then(data => {
    
        
        let poblacionArg = document.querySelector ("#poblacion"); 
        let casosArg = document.querySelector('#casosArg');
        let recArg = document.querySelector ('#recuperadosArg');
        let muertesArgg = document.querySelector('#muertesArg');
        let porcentaje = document.querySelector ("#porcentajeArg");
        
        
        
    

        let poblacionAr = data['Argentina']['All']['population']
        let casosTotArg = data['Argentina']['All']['confirmed']
        let RecupArg = data['Argentina']['All']['recovered']
        let muertesArg = data['Argentina']['All']['deaths']
    
        
        
        
        poblacionArg.innerHTML = " Poblacion total : " + poblacionAr; 
        casosArg.innerHTML = "Casos totales : " + casosTotArg;
        muertesArgg.innerHTML = "Muertes totales : " + muertesArg;
        recArg.innerHTML = "Recuperados : " + RecupArg;
        var t = (parseInt(muertesArg) / parseInt(casosTotArg));
        porcentaje.innerHTML = " Porcentaje de muertos % " + parseFloat(t).toFixed(4); 
        
        
    
        console.log(data)
    
    
    })
    .catch(err=>console.log(err))
}

function api2 (){

    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        let elemento = document.getElementById("foto")
        elemento.innerHTML =`<div class = "perro"><img src="${data.message}"/></div>`;

    })
.catch(err=>console.log(err))
}


function palabras (){
    let numeroRandom = Math.floor(Math.random() * 3)
    if (numeroRandom == 0) {
        chiste = 'Hola ¿esta Agustin? No, estoy incomodin ';
    }else if (numeroRandom == 1){
        chiste = 'Jesus ¿como fue la ultima cena?,¿salio cara? Ojala ... salio cruz';
    }
    else{
        chiste = 'En medio de la dificultad reside la oportunidad';
    }
    return chiste;
}