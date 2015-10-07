// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado, opcionMenu = "CRM";

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");

var xhReq = new XMLHttpRequest();

var app = {

    // Constructor de la app
    initialize: function() {
    	// Estado inicial mostrando capa cuerpo
    	estado="cuerpo";
    	
    	// Creamos el elemento style, lo a–adimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
	    var heightCuerpo=window.innerHeight-46;
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:64px; width:100%; height: '+heightCuerpo+'px; overflow:auto;}';
	    document.getElementsByTagName('head')[0].appendChild(style);
	    
	    // A–adimos las clases necesarias
		cuerpo.className = 'page center';
		menuprincipal.className = 'page center';
		wrapper.className = 'cssClass';
			
		// Leemos por ajax el archivos opcion1.html de la carpeta opciones
		//xhReq.open("GET", "opciones/"+opcionMenu+"/opcion1.html", false);
		xhReq.open("GET", "opciones/VENTAS/opcion2.html", false);
		xhReq.send(null);
		document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

		// Leemos por ajax el archivos menu.html de la carpeta opciones
		// xhReq.open("GET", "opciones/opcion"+opcionMenu+".html", false);
		xhReq.open("GET", "opciones/opcionCRM.html", false);
		xhReq.send(null);
		document.getElementById("ulMenu").innerHTML = xhReq.responseText;
		
		// Creamos los 2 scroll mediante el plugin iscroll, uno para el menœ principal y otro para el cuerpo
		myScroll = new iScroll('wrapper', { hideScrollbar: true });
		myScrollMenu = new iScroll('wrapperMenu', { hideScrollbar: true });
	
        //this.bindEvents();
        this.onDeviceReady();
    },

    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    	// Ejecutamos la funci—n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
    	new FastClick(document.body);
    	this.successCB();
    },
    successCB: function() {

    alert("Base de datos creada", {},"Operación ok");
              $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetCustomerList",
                 type: "GET",
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (data) {
          
                   var msg = JSON.parse(data);
 
                   var lista = $('<ul/>');

                     for (var i in msg) {
                         lista.append(

                             $('<li/>').append(
                                $('<div/>').addClass('list_client').append(
                                    $('<div/>').addClass('borde-menu color1')).append(
                                    $('<p/>').text(msg[i]['customer']))
                                )
                             )
                     }
                     
                     $("#divClientes").append(lista);

                   for (i = 0; i < msg.length; i++) {
                   	console.log(msg[i]['customer']);
                       //var option = $('<option/>');
                       //option.attr('value', msg[i]['customer']).text(msg[i]['customer']);
                       //$("#ped_cliente").append(option);
                       //$("#resultado4").append(msg[i]['customer']);
                   }
                  // $('#ped_cliente').selectmenu().selectmenu('refresh',true);
                },
                error: function (response) {
                  alert("Error "+response.statusCode);
                }
         });
   },
};

// Funci—n para a–adir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Funci—n para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function menu(opcion){
	// Si pulsamos en el bot—n de "menu" entramos en el if
	if(opcion=="menu"){
		if(estado=="cuerpo"){
			cuerpo.className = 'page transition right';
			estado="menuprincipal";
		} else if(estado=="menuprincipal"){
			cuerpo.className = 'page transition center';
			estado="cuerpo";	
		}
	// Si pulsamos un bot—n del menu principal entramos en el else
	}
	else if(opcion.match(/[a-zA-Z]/i))
    {
       //Obtenemos el submenu que se agregara en la parte inferior del menu lateral ejem: opcionCRM
       xhReq.open("GET", "opciones/opcion"+opcion+".html", false);
       xhReq.send(null);

  	   //Reemplazamos el HTML por uno nuevo
       var lista = document.getElementById("ulMenu");
       lista.innerHTML = xhReq.responseText;
       opcionMenu = opcion;

	   ////var selectBox = document.getElementById('ulMenu');
       ////var items = selectBox.getElementsByTagName('LI');
       // var items = document.querySelectorAll('#ulMenu li:nth-child(n+2)');
       
       //selectBox.innerHTML = xhReq.responseText;
       	
       //for(i=0; i<items.length; i++) {
		// console.log("---- "+items[i].innerHTML);
       //}
    }
}

function submenu(opcion){
    // A–adimos la clase al li presionado
	addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		
	// Recogemos mediante ajax el contenido del html segœn la opci—n clickeada en el menu
	xhReq.open("GET", "opciones/"+opcionMenu+"/opcion"+opcion+".html", false);
	xhReq.send(null);
	document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
		
		// Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
	myScroll.refresh();
	myScroll.scrollTo(0,0);
		
	// A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
	cuerpo.className = 'page transition center';
	estado="cuerpo";
		
	// Quitamos la clase a–adida al li que hemos presionado
	setTimeout(function() {
		removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
	}, 300);
}