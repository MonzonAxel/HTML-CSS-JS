var token;
var btc;
var cripto;


function login(){
  axios.post('http://localhost:1337/auth/local', {
          identifier: 'admin@example.com',
          password: '123456',
        })
        .then(response => {
          token = "Bearer "+response.data.jwt;
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
}


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
    fetch('https://api.coindesk.com/v1/bpi/currentprice/ARS.json')
        .then(response => response.json())
        .then(response => {
          let usd = document.querySelector("#usd"); 
          let ars = document.querySelector('#ars');
          let update = document.querySelector ('#update');
          btc = response


          let usd1 = response['bpi']['USD']['rate_float']
          let ars1 = response['bpi']['ARS']['rate_float']
          let update1 = response['time']['updated']

          usd.innerHTML = "Precio del bitcoin en USD : " + usd1;
          ars.innerHTML = "Precio del bitcoin en ARS : " + ars1;
          update.innerHTML = "Fecha actualizada al dia de : " + update1;
          
          const newPost = {
            usd : btc.bpi.USD.rate_float,
            ars : btc.bpi.ARS.rate_float,
            update : btc.time.updated
        }

        console.log(newPost)

        fetch('http://localhost:1337/criptos', {
            method: POST,
            body: JSON.stringify(newPost)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        })
        })

        .catch(error => {
          console.log("Error", error);
        })

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
        frase = 'Nunca consideres el estudio como una obligacion sino como una oportunidad para entrar en el bello y maravilloso mundo del saber.';
    }else if (numeroRandom == 1){
        frase = 'Tu peor enemigo es tu mente , no solo porque conoce tus debilidades, sino porque es quien ademas las crea.';
    }
    else{
        frase = 'Tienes millones de cosas para sonreir , no busques una sola para llorar.';
    }
    return frase;
}