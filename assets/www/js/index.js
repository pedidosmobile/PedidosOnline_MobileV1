// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado, opcionMenu = "CRM";

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");

var conexion = window.openDatabase("PedidosMobileDB1", "1.0", "Pedidos mobile DB1", 200000);

var xhReq = new XMLHttpRequest();
var query = '';

var app = {

    // Constructor de la app
    initialize: function() {
    	// Estado inicial mostrando capa cuerpo
    	estado="cuerpo";
    	
      $("#TituloModulo").append(
        $('<p/>').append(
          $('<span/>').text('Pedidos'),
          $('<b/>').text('Online')
        ).addClass('logo')
      )

    	// Creamos el elemento style, lo a–adimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
	    var heightCuerpo=window.innerHeight-46;
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:64px; width:100%; height: '+heightCuerpo+'px;}';
	    document.getElementsByTagName('head')[0].appendChild(style);
	    
	    // A–adimos las clases necesarias
		
      cuerpo.className = 'page center';
  		menuprincipal.className = 'page center';
  		wrapper.className = 'cssClass';
  			
  		// Leemos por ajax el archivos opcion1.html de la carpeta opciones
  		xhReq.open("GET", "opciones/"+opcionMenu+"/opcion1.html", false);
  		xhReq.send(null);
  		document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

  		// Leemos por ajax el archivos menu.html de la carpeta opciones
  		// xhReq.open("GET", "opciones/opcion"+opcionMenu+".html", false);
  		xhReq.open("GET", "opciones/opcionCRM.html", false);
  		xhReq.send(null);
  		document.getElementById("ulMenu").innerHTML = xhReq.responseText;
  		
  		// Creamos los 2 scroll mediante el plugin iscroll, uno para el menœ principal y otro para el cuerpo
  		//myScroll = new iScroll('wrapper', { hideScrollbar: true });
  		//myScrollMenu = new iScroll('wrapperMenu', { hideScrollbar: true });

        //this.bindEvents();
        this.onDeviceReady();
      },

    bindEvents: function() {
      //document.addEventListener('deviceready', this.onDeviceReady, false);
      },

    onDeviceReady: function() {
    	// Ejecutamos la funci—n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
    	new FastClick(document.body);
    	//this.successCB();
        db = window.openDatabase("PedidosMobileDB1", "1.0", "Pedidos mobile DB1", 200000);
        db.transaction(app.Crear_BD, app.errorCB, app.successCB);
      },

    errorCB : function(err) {
      alert("Error en la operación "+err, {},"Operación fallo");
      },

    successCB: function() {
      //StartPage();
      },

    Crear_BD: function(tx){
      tx.executeSql('CREATE TABLE IF NOT EXISTS descuento(des_id INTEGER PRIMARY KEY ASC, ter_id int, item_id int,des_valorDescuento varchar(45),des_porcentaje varchar(45),des_estado varchar(45),des_fechaCreacion vachar(45),des_usuarioCreacion varchar(45), des_estadoSync varchar(10), des_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS item (item_id integer primary key asc,item_referencia varchar(45),item_codigo varchar(45),item_descripcion varchar(45),item_cantidadBase varchar(45),item_stock varchar(45),item_estado varchar(45),item_fechaCreacion varchar(45),item_usuarioCreacion varchar(45), item_estadoSync varchar(10), item_rowidPortal int)');   
      tx.executeSql('CREATE TABLE IF NOT EXISTS maestro (mae_id integer primary key asc,mae_tipo varchar(45),mae_descripcion varchar(45),mae_moneda varchar(45),mae_fechaCreacion varchar(45),mae_usuarioCreacion varchar(45),mae_estado varchar(45),usu_id int,suc_id int, mae_estadoSync varchar(10), mae_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS pedido (ped_id integer primary key asc,ter_id int,mae_id int,pto_id int,ped_fechapedido varchar(45),ped_fechaEntrega varchar(45),ped_observaciones varchar(45),ped_observaciones2 varchar(45),ped_ordenCompra varchar(45),ped_referencia varchar(45),ped_valorNeto varchar(45),ped_descuento varchar(45),ped_impuesto varchar(45),ped_valorTotal varchar(45),ped_valorFacturado varchar(45),ped_estado varchar(45),ped_nroPedidoERP varchar(45),ped_nroFacturaERP varchar(45),ped_estadoERP varchar(45),ped_medioDePago varchar(45),ped_estadoDePago varchar(45),ped_saldo varchar(45), ped_estadoSync varchar(10), ped_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS pedido_detalle (pdet_id integer primary key ASC,ped_id int,mae_id int,item_id int,pdet_descripcion varchar(45),pdet_cantidad varchar(45),pdet_valorImpuesto varchar(45),pdet_porcentajeDescuento  varchar(45),pdet_descuento varchar(45),pdet_valorNeto varchar(45),pdet_fechaCreacion varchar(45),pdet_usuarioCreacion varchar(45), pdet_estadoSync varchar(10), pdet_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS precio (pre_id integer primary key ASC,item_id int,mae_id int,pre_unidad varchar(45),pre_precio varchar(45),pre_factor varchar(45),pre_fechaCreacion varchar(45),pre_usuarioCreacion varchar (45), pre_estadoSync varchar(10), pre_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS punto_envio (pto_id integer PRIMARY KEY asc,pto_nombre varchar(45),pto_estado varchar(45),pto_fechaCreacion varchar(45),pto_usuarioCreacion varchar(45),suc_id int, pto_estadoSync varchar(10), pto_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS sucursal (suc_id int PRIMARY KEY asc,suc_nombre varchar(45),ter_id int, suc_tipo varchar(45),suc_direccion varchar(45),suc_telefono1 varchar(45),suc_telefono2 varchar(45),suc_codigoPostal varchar(45),suc_ciudad varchar(45),suc_depto varchar(45),suc_pais varchar(45),suc_nombreContacto varchar(45),suc_mailCcontacto varchar(45),suc_condicionPago varchar(45),suc_bloqueoCupo varchar(45),suc_bloqueomora varchar(45),suc_cupoCredito varchar(45),suc_estado varchar(45),suc_fechaCreacion varchar(45),suc_usuarioCreacion  varchar(45), suc_estadoSync varchar(10), suc_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS tercero (ter_id integer PRIMARY key asc, ter_identificacion varchar(45),ter_tipoIdentificacion  varchar(45),ter_razonSocial varchar(45),ter_estado varchar(45),ter_esVendedor varchar(45), ter_esCliente varchar(45),ter_esProveedor  varchar(45),ter_fechaCreacion varchar(45),ter_usuario_Creacion varchar(45), ter_estadoSync varchar(10), ter_rowidPortal int)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (usu_id integer PRIMARY key asc, usu_cedula varchar(45),usu_nombre varchar(45),usu_indActivo varchar(45),usu_username varchar(45),usu_password varchar(45),usu_empresa varchar(45),usu_nitEmpresa varchar(45),usu_fechaCreacion varchar(45),usu_usuarioCreacion  varchar(45), usu_estadoSync varchar(10), usu_rowidPortal int)');
      //db.transaction(app.synchronization);
        },

    synchronization: function(tx){
        //SincronizarTerceros();
        }
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
	
    //myScroll = new iScroll('wrapper', { hideScrollbar: true });	
		// Refrescamos el elemento iscroll segœn el contenido ya a–adido mediante ajax, y hacemos que se desplace al top
	//myScroll.refresh();
	//myScroll.scrollTo(0,0);
		
	// A–adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
	cuerpo.className = 'page transition center';
	estado="cuerpo";
		
	// Quitamos la clase a–adida al li que hemos presionado
	setTimeout(function() {
		removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
	}, 300);

  //limpio el encabezado anterior
  $("#TituloModulo").empty();
  //Agrego el nuevo encabexado
  $("#TituloModulo").append(
        $('<p/>').append(
          $('<span/>').text(opcionMenu)
        ).addClass('logo')
      )

  var element = document.getElementById("contenidoCuerpo");
  eval(element.firstChild.innerHTML);
}

function StartPage() {
  alert('desde bd portal');
    //alert("Base de datos creada", {},"Operación ok");
              $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetCustomerList",
                 type: "GET",
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (data) {
          
                   var dataparse = JSON.parse(data);
 
                   var lista = $('#divClientes');

                     //for (var i in dataparse) {
                     for (i = 0; i < dataparse.length; i++) {
                         lista.append(
                              $('<a/>').addClass('button color1').append(
                                 $('<span/>').text('Cliente: ' + dataparse[i]['customer']).addClass('meta expiry'),
                                 $('<i/>').addClass('chevron')
                             )
                             )
                     }
                },
                error: function (response) {
                  alert("Error "+response.statusCode);
                }
         });
}

/*function GetListaPedidos() {
             $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetListaPedidos",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                     var dataparse = JSON.parse(data);

                     //console.log(dataparse);

                     var x = 1;

                     var lista = $('#divPedidos');

                     var status;
                     //for (var i in dataparse) {
                     for (i = 0; i < dataparse.length; i++) {
                     	
                     	if(i%2 == 0)	
                        	status = $('<i/>').addClass('great')
                        else
                        	status = $('<i/>').addClass('warning')

                         lista.append(
                              $('<a/>').addClass('button color' + x).append(
                                 $('<span/>').text('Nro. PEDIDO: ' + dataparse[i]['Nro_Pedido']).addClass('meta expiry'),
                                 status,
                                 $('<span/>').text('FECHA: ' + dataparse[i]['Fecha_Pedido']).addClass('meta date'),
                                 $('<span/>').text(dataparse[i]['Empresa']).addClass('item'),
                                 $('<span/>').text('SUCURSAL: ' + dataparse[i]['Sucursal']).addClass('meta expiry'),
                                 $('<span/>').text('$' + dataparse[i]['Valor']).addClass('meta cost'),
                                 $('<i/>').addClass('chevron')
                             )//.attr("href", "http://www.google.com/")
                             )
                         
                         x = x + 1;
                         if (x == 5)
                             x = 1;
                     }
                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
}*/

//SINCRONIZACION
function SincronizarTerceros(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarTerceros",
                 //url: "http://gabrica.pedidosonline.co/SVC/ObtenerDatos?entidad=TERCEROS",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 //crossDomain: true,
                 success: function (data) {
                  //debugger;

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO tercero(ter_rowidPortal, ter_identificacion, ter_tipoIdentificacion, ter_razonSocial, ter_estado, ter_esVendedor, ter_esCliente, ter_esProveedor, ter_fechaCreacion, ter_usuario_Creacion) values(';
                    query += dataparse[i]['ter_rowidPortal'] 
                          + ', "' + dataparse[i]['ter_identificacion'] + '"'
                          + ', "' + dataparse[i]['ter_tipoIdentificacion'] + '"'
                          + ', "' + dataparse[i]['ter_razonSocial'] + '"'
                          + ', "' + dataparse[i]['ter_estado'] + '"'
                          + ', "' + dataparse[i]['ter_esVendedor'] + '"'
                          + ', "' + dataparse[i]['ter_esCliente'] + '"'
                          + ', "' + dataparse[i]['ter_esProveedor'] + '"'
                          + ', "' + dataparse[i]['ter_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['ter_usuario_Creacion'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarSucursales(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarSucursales",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO sucursal(suc_rowidPortal, suc_nombre,ter_id, suc_tipo, suc_direccion,suc_telefono1, suc_telefono2, suc_codigoPostal, suc_ciudad, suc_depto, suc_pais, suc_nombreContacto,suc_mailCcontacto, suc_condicionPago, suc_bloqueoCupo,suc_bloqueomora,suc_cupoCredito,suc_estado,suc_fechaCreacion, suc_usuarioCreacion,suc_estadoSync) values(';
                    query += dataparse[i]['suc_rowidPortal'] 
                          + ', "' + dataparse[i]['suc_nombre'] + '",'
                          +         dataparse[i]['ter_id']
                          + ', "' + dataparse[i]['suc_tipo'] + '"'
                          + ', "' + dataparse[i]['ter_estado'] + '"'
                          + ', "' + dataparse[i]['suc_direccion'] + '"'
                          + ', "' + dataparse[i]['suc_telefono1'] + '"'
                          + ', "' + dataparse[i]['suc_telefono2'] + '"'
                          + ', "' + dataparse[i]['suc_codigoPostal'] + '"'
                          + ', "' + dataparse[i]['suc_ciudad'] + '"'
                          + ', "' + dataparse[i]['suc_depto'] + '"'
                          + ', "' + dataparse[i]['suc_pais'] + '"'
                          + ', "' + dataparse[i]['suc_nombreContacto'] + '"'
                          + ', "' + dataparse[i]['suc_mailCcontacto'] + '"'
                          + ', "' + dataparse[i]['suc_condicionPago'] + '"'
                          + ', "' + dataparse[i]['suc_bloqueoCupo'] + '"'
                          + ', "' + dataparse[i]['suc_bloqueomora'] + '"'
                          + ', "' + dataparse[i]['suc_cupoCredito'] + '"'
                          + ', "' + dataparse[i]['suc_estado'] + '"'
                          + ', "' + dataparse[i]['suc_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['suc_estadoSync'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarPuntosEnvio(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarPuntosEnvio",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO punto_envio(pto_rowidPortal, pto_nombre, pto_estado, pto_fechaCreacion, pto_usuarioCreacion, pto_estadoSync) values(';
                    query += dataparse[i]['pto_rowidPortal'] 
                          + ', "' + dataparse[i]['pto_nombre'] + '"'
                          + ', "' + dataparse[i]['pto_estado'] + '"'
                          + ', "' + dataparse[i]['pto_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['pto_usuarioCreacion'] + '"'
                          + ', "' + dataparse[i]['pto_estadoSync'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarMaestros(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarMaestros",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO maestro(mae_rowidPortal, mae_tipo, mae_descripcion, mae_moneda, mae_fechaCreacion, mae_usuarioCreacion,mae_estado,suc_id,mae_estadoSync) values(';
                    query += dataparse[i]['mae_rowidPortal'] 
                          + ', "' + dataparse[i]['mae_tipo'] + '"'
                          + ', "' + dataparse[i]['mae_descripcion'] + '"'
                          + ', "' + dataparse[i]['mae_moneda'] + '"'
                          + ', "' + dataparse[i]['mae_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['mae_usuarioCreacion'] + '"'
                          + ', "' + dataparse[i]['mae_estado'] + '"'
                          + ', '  + dataparse[i]['suc_id']
                          + ', "' + dataparse[i]['mae_estadoSync'] + '");'
                    //console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarPedidos(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarPedidos",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO pedido(ped_rowidPortal,ter_id,mae_id,pto_id,ped_fechapedido,ped_fechaEntrega,ped_observaciones,ped_observaciones2,ped_ordenCompra,ped_referencia,ped_valorNeto,ped_descuento,ped_impuesto,ped_valorTotal,ped_valorFacturado,ped_estado,ped_nroPedidoERP,ped_nroFacturaERP,ped_estadoERP,ped_medioDePago, ped_estadoSync) values(';
                    query += dataparse[i]['ped_rowidPortal'] 
                          + ',' + dataparse[i]['ter_id']
                          + ',' + dataparse[i]['mae_id']
                          + ', "' + dataparse[i]['pto_id'] + '"'
                          + ', "' + dataparse[i]['ped_fechapedido'] + '"'
                          + ', "' + dataparse[i]['ped_fechaEntrega'] + '"'
                          + ', "' + dataparse[i]['ped_observaciones'] + '"'
                          + ', "' + dataparse[i]['ped_observaciones2'] + '"'
                          + ', "' + dataparse[i]['ped_ordenCompra'] + '"'
                          + ', "' + dataparse[i]['ped_referencia'] + '"'
                          + ', "' + dataparse[i]['ped_valorNeto'] + '"'
                          + ', "' + dataparse[i]['ped_descuento'] + '"'
                          + ', "' + dataparse[i]['ped_impuesto'] + '"'
                          + ', "' + dataparse[i]['ped_valorTotal'] + '"'
                          + ', "' + dataparse[i]['ped_valorFacturado'] + '"'
                          + ', "' + dataparse[i]['ped_estado'] + '"'
                          + ', "' + dataparse[i]['ped_nroPedidoERP'] + '"'
                          + ', "' + dataparse[i]['ped_nroFacturaERP'] + '"'
                          + ', "' + dataparse[i]['ped_estadoERP'] + '"'
                          + ', "' + dataparse[i]['ped_medioDePago'] + '"'
                          + ', "' + dataparse[i]['ped_estadoSync'] + '");'
                    //console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarItems(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarItems",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO item(item_rowidPortal,item_referencia,item_codigo,item_descripcion,item_estado,item_fechaCreacion,item_usuarioCreacion,item_estadoSync) values(';
                    query += dataparse[i]['item_rowidPortal'] 
                          + ', "' + dataparse[i]['item_referencia'] + '"'
                          + ', "' + dataparse[i]['item_codigo'] + '"'
                          + ', "' + dataparse[i]['item_descripcion'] + '"'
                          + ', "' + dataparse[i]['item_estado'] + '"'
                          + ', "' + dataparse[i]['item_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['item_usuarioCreacion'] + '"'
                          + ', "' + dataparse[i]['item_estadoSync'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarPrecios(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarPrecios",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO precio(pre_rowidPortal,item_id,pre_unidad,pre_precio,pre_fechaCreacion,pre_usuarioCreacion,pre_estadoSync) values(';
                    query += dataparse[i]['pre_rowidPortal'] 
                          + ',' + dataparse[i]['item_id']
                          + ', "' + dataparse[i]['pre_unidad'] + '"'
                          + ', "' + dataparse[i]['pre_precio'] + '"'
                          + ', "' + dataparse[i]['pre_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['pre_usuarioCreacion'] + '"'
                          + ', "' + dataparse[i]['pto_estadoSync'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function SincronizarDetallePedidos(){
  $.ajax({
                 url: "http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/SincronizarDetallePedidos",
                 type: "GET",
                 cache: false,
                 data: "{}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 processData: true,
                 success: function (data) {

                 var dataparse = JSON.parse(data);

                 for (i = 0; i < dataparse.length; i++) {
                  query = 'INSERT INTO pedido_detalle(pdet_rowidPortal,ped_id,item_id,pdet_descripcion,pdet_cantidad,pdet_valorImpuesto,pdet_porcentajeDescuento,pdet_descuento,pdet_valorNeto,pdet_fechaCreacion,pdet_usuarioCreacion,pdet_estadoSync) values(';
                    query += dataparse[i]['pdet_rowidPortal'] 
                          + ',' + dataparse[i]['ped_id']
                          + ',' + dataparse[i]['item_id']
                          + ', "' + dataparse[i]['pdet_descripcion'] + '"'
                          + ', "' + dataparse[i]['pdet_cantidad'] + '"'
                          + ', "' + dataparse[i]['pdet_valorImpuesto'] + '"'
                          + ', "' + dataparse[i]['pdet_porcentajeDescuento'] + '"'
                          + ', "' + dataparse[i]['pdet_descuento'] + '"'
                          + ', "' + dataparse[i]['pdet_valorNeto'] + '"'
                          + ', "' + dataparse[i]['pdet_fechaCreacion'] + '"'
                          + ', "' + dataparse[i]['pdet_usuarioCreacion'] + '"'
                          + ', "' + dataparse[i]['pdet_estadoSync'] + '");'
                    console.log(query);
                    saveDetails(query);
                  }

                 },
                 error: function (response) {
                     console.log("Error");
                     console.log(response.statusCode);
                 }
             });
        }

function saveDetails(query){
 self.conexion.transaction(function(tx,rs){
    tx.executeSql(query);
    query = '';
    console.log('****************************************INSERTADO********************************************');
 });
  }

function GetListaPedidos(tx){
    var lista = $('#divPedidos');
    var x = 1;
    var statusSync;
    self.conexion.transaction(function(tx,rs){
    tx.executeSql('SELECT ped.ped_id, ped.ped_nroPedidoERP, ped.ped_fechapedido,' +
                          'ped.ped_valorTotal,ter.ter_razonSocial, suc.suc_nombre, ped.ped_estadoSync ' +
                            'from pedido ped ' +
                              'join tercero ter ' +
                                'on ped.ter_id = ter.ter_rowidPortal ' +
                              'join sucursal suc ' +
                                'on ter.ter_rowidPortal = suc.ter_id',[],
          function(tx,rs) {
             for (var a = 0; a < rs.rows.length; a++) {

              var elemento=rs.rows.item(a);

                if(elemento.ped_estadoSync = "1")  
                          statusSync = $('<i/>').addClass('great')
                        else
                          statusSync = $('<i/>').addClass('warning')

                lista.append(
                              $('<a/>').addClass('button color' + x).append(
                                 $('<span/>').text('Nro. PEDIDO: ' + elemento.ped_nroPedidoERP).addClass('meta expiry'),
                                 statusSync,
                                 $('<span/>').text('FECHA: ' + elemento.ped_fechapedido).addClass('meta date'),
                                 $('<span/>').text(elemento.ter_razonSocial).addClass('item'),
                                 $('<span/>').text('SUCURSAL: ' + elemento.suc_nombre).addClass('meta expiry'),
                                 $('<span/>').text('$' + elemento.ped_valorTotal).addClass('meta cost'),
                                 $('<i/>').addClass('chevron')
                             ).attr("href", "javascript:DetallePedido(" + elemento.ped_id + ");")
                             )
                         
                         x = x + 1;
                         if (x == 5)
                             x = 1;
                    }
             //navigator.notification.alert(elemento.ped_nroPedidoERP);
             //console.log(elemento.ped_nroPedidoERP);
          },
          function(tx, err) {
            alert('Error ' + err);
          }
        );
    });
    }

function DetallePedido(idpedido){

  xhReq.open("GET", "opciones/VENTAS/nuevopedido.html", false);
  xhReq.send(null);
  document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
  var cliente = $('#divPedidoDetalle');



    self.conexion.transaction(function(tx,rs){
    tx.executeSql('SELECT ped.ped_id, ped.ped_nroPedidoERP, ped.ped_fechapedido,' +
                          'ped.ped_valorTotal,ter.ter_razonSocial, suc.suc_nombre ' +
                            'from pedido ped ' +
                              'join tercero ter ' +
                                'on ped.ter_id = ter.ter_rowidPortal ' +
                              'join sucursal suc ' +
                                'on ter.ter_rowidPortal = suc.ter_id ' +
                              'where ped_id = ' + idpedido ,[],
          function(tx,rs) {
             //for (var a = 0; a < rs.rows.length; a++) {
                      var elemento=rs.rows.item(0);
                      //alert(elemento.ter_razonSocial);

                      //cliente.append('<input type="text" name="something" id="something" value="' + elemento.ter_razonSocial +'" />')
                      var cliente2 = $('#txtCliente').val(elemento.ter_razonSocial);
                   // }
          },
          function(tx, err) {
            alert('Error ' + err);
          }
        );
    });

    var element = document.getElementById("contenidoCuerpo");
    eval(element.firstChild.innerHTML);
    }

function CustomerList(tx){
  alert('desde bd local');
    var lista = $('#divClientes');
    self.conexion.transaction(function(tx,rs){
    tx.executeSql('SELECT ter_razonSocial from tercero',[],
          function(tx,rs) {
             for (var a = 0; a < rs.rows.length; a++) {

              var elemento=rs.rows.item(a);

                         lista.append(
                              $('<a/>').addClass('button color1').append(
                                 $('<span/>').text('Cliente: ' + elemento.ter_razonSocial).addClass('meta expiry'),
                                 $('<i/>').addClass('chevron')
                             )
                             )
                     }
          },
          function(tx, err) {
            alert('Error ' + err);
          }
        );
    });
    }