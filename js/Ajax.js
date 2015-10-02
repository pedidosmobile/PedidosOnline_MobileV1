Ajax={};

/* metodo :    String - GET / POST
 * url :       String - Direccion de consumo WS
 * callback :  function()  - Metodo que recibirá la respuesta */
Ajax.buildRequest = function(metodo, url, callback)
{
    this.request = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("MSXML2.XMLHTTP");
    this.request.onreadystatechange = callback;
    this.request.open(metodo, url, true);
    this.request.send(url);
},


/* metodo :    String - GET / POST
 * url :       String - Direccion de consumo WS
 * callback :  function()  - Metodo que recibirá la respuesta 
 * data :      Array  - Datos a enviar al web services */
Ajax.buildRequestData = function(metodo, url, callback, data)
{
    this.request = (window.XMLHttpRequest) ? new XMLHttpRequest(): new ActiveXObject("MSXML2.XMLHTTP");
    this.request.onreadystatechange = callback;
    //this.request.open(form.method, form.action, true);
    this.request.open(metodo, url, true);
    this.request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    this.request.send(JSON.stringify(data));
},

/* _IdElemento : String - id del elemento grafico HTML5*/
Ajax.checkState = function(_IdElemento)
{
  switch(this.request.readyState)
  {
    case 0:
      //console.log('Sin inicializar ...');
      document.getElementById(_IdElemento).innerHTML = 'Sin inicializar ...';
      break;

    case 1:
      //console.log('Cargando ...');
      document.getElementById(_IdElemento).innerHTML = 'Cargando ...';
      break;

    case 2:
      //console.log('Cargado...');
      document.getElementById(_IdElemento).innerHTML = 'Cargado...';
      break;

    case 3:
      //console.log('Interactivo...');
      document.getElementById(_IdElemento).innerHTML = 'Interactivo...';
      break;

    case 4:
      //console.log('Listo');
      document.getElementById(_IdElemento).innerHTML = 'Listo';
      app.peticionState=false;
      return this.request.status;
  }
},

Ajax.getResponse = function()
{
  // ('Content-Type').indexOf('json')
  if(this.request.getResponseHeader('Content-Type').indexOf('xml') != -1){
    return this.request.response.documentElement;
  }
  else if (this.request.getResponseHeader('Content-Type').indexOf('json') > -1) {
    return JSON.parse(this.request.responseText); 
  } 
  else{
    return this.request.responseText;
  }
}