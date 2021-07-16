google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMaterial);
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
          console.log('An error occurred:', error.response.data.statusCode);
        });
}

function consultarApiBitcoin(){
  axios.get('https://api.coindesk.com/v1/bpi/currentprice/ARS.json')
      .then(response => {
        btc = response;
      })
      .catch(error => {
        console.log("Error");
      });
  setTimeout(function(){
    var hoy = new Date(btc.data.time.updated);
    axios.post('http://localhost:1337/criptos', {
          usd: btc.data.bpi.USD.rate_float,
          ars: btc.data.bpi.ARS.rate_float,
          update: hoy,
          },{
          headers: {
            Authorization: token,
            },
          }).then(response => {
            console.log('Data: ', response);
            alert('¡Nuevos valores guardados! Actualizar tabla para ver los cambios.');
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          });
  }, 500);
}

function getCriptomoneda(){
  axios.get('http://localhost:1337/criptos', {
    headers: {
      Authorization: token,
    }
  }).then(response => {
    console.log('Data: ', response.data, response);
    cripto = response.data;
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });

  setTimeout(function(){
    var fecha;
    var hora;
    cripto = cripto.slice(Math.max(cripto.length - 10, 0));
    cripto.sort((a, b) => b.update_at - a.update_at).reverse();
    $('#resultados').html(' ');

    $('#resultados').append('<table class="table">'+
                            '<thead>'+
                              '<tr>'+
                                '<th scope="col">#</th>'+
                                '<th scope="col">Fecha y Hora</th>'+
                                '<th scope="col">Valor en ARS</th>'+
                                '<th scope="col">Valor en USD</th>'+
                                '<th scope="col">Eliminar</th>'+
                              '</tr>'+
                            '</thead>'+
                            '<tbody id="t-body">'+
                            '</tbody>'+
                          '</table>');

      cripto.forEach(function each(moneda, indice){
        update = new Date(moneda.updated_at);
        console.log(update);
        fecha = update.getDate() + "/" + update.getMonth() + "/" + update.getFullYear();
        hora = update.toString().split(' ')[4];
        $('#t-body').append('<tr>'+
            '<th scope="row">'+indice+'</th>'+
            '<td>'+fecha+ ' - '+ hora +'</td>'+
            '<td>'+moneda.ars+'</td>'+
            '<td>'+moneda.usd+'</td>'+
            '<td><a class="pl-3 primary" onclick="borrarEntrada(' + moneda.id + ')"><i class="far fa-trash-alt"></i></a></td>'+
        '</tr>');
    });

  }, 500);
}

function borrarEntrada(id){
  axios.delete('http://localhost:1337/criptos/'+id, {
    headers: {
      Authorization: token,
    }
  }).then(response => {
    console.log('Data: ', response.data, response);
    alert("Entrada eliminada");
    setTimeout(function(){
      getCriptomoneda();
    }, 500);
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });
}

function grafico(){
  var bitcoin;
  axios.get('http://localhost:1337/criptos', {
    headers: {
      Authorization: token,
    }
  }).then(response => {
    console.log('Data: ', response.data, response);
    bitcoin = response.data;
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });
  setTimeout(function(){
    $('#resultados').html(' ');
    var arrayPrueba = [['Update', 'Precio bitcoin ARS', 'Precio bitcoin USD']];

          //Info
          bitcoin.forEach(function(update, indice){
            arrayPrueba.push([indice,update.ars,update.usd]);
          });

          console.log(bitcoin, arrayPrueba);

          var data = google.visualization.arrayToDataTable(arrayPrueba);

          var materialOptions = {
                                chart: {
                                  title: 'Precio del bitcoin'
                                },
                                hAxis: {
                                  title: 'Bitcoin',
                                  minValue: 0,
                                },
                                bars: 'vertical'
                              };
        var materialChart = new google.charts.Bar(document.getElementById('resultados'));
        materialChart.draw(data, materialOptions);

  }, 500);

}
