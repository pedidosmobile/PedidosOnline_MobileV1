// Declaraci—n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado, opcionMenu = "CRM";

// Guardamos en variables elementos para poder rescatarlos despuŽs sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");

var conexion = window.openDatabase("PedidosMobileDB", "1.0", "Pedidos mobile DB", 200000);

var xhReq = new XMLHttpRequest();
var query = '';

var app = {

    // Constructor de la app
    initialize: function() {
     	// Estado inicial mostrando capa cuerpo
    	estado="cuerpo";
    	
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
		  //xhReq.open("GET", "opciones/"+opcionMenu+"/opcion1.html", false);
      xhReq.open("GET", "opciones/VENTAS/nuevoPedido.html", false);
      xhReq.send(null);
		  document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;

		  // Leemos por ajax el archivos menu.html de la carpeta opciones
		  // xhReq.open("GET", "opciones/opcion"+opcionMenu+".html", false);
		  xhReq.open("GET", "opciones/opcionCRM.html", false);
		  xhReq.send(null);
		  document.getElementById("ulMenu").innerHTML = xhReq.responseText;
		
		  // Creamos los 2 scroll mediante el plugin iscroll, uno para el menœ principal y otro para el cuerpo
		  //myScroll = new iScroll('wrapper', { hideScrollbar: true });
		  myScrollMenu = new iScroll('wrapperMenu', { hideScrollbar: true });

      //var element = document.getElementById("contenidoCuerpo");
      //eval(element.firstChild.innerHTML);
  var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });


      this.bindEvents();
      //this.onDeviceReady();
    },

    bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    	// Ejecutamos la funci—n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
    	new FastClick(document.body);
    	//this.successCB();
      self.conexion.transaction(app.Crear_BD, app.errorCB, app.successCB, app.insertRecord);
    },

    errorCB : function(err) {
        alert("Error en la operación "+err, {},"Operación fallo");
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

                 for(var i in msg) {
                      lista.append(
                        $('<li/>').append(
                            $('<div/>').addClass('list_client').append(
                            $('<div/>').addClass('borde-menu color1')).append(
                            $('<p/>').text(msg[i]['customer']))
                          )
                        )
                 }
                  $("#divClientes").append(lista);                  
                },
              error: function (response) {
                  alert("Error "+response.statusCode);
              }
         });
    },

    Crear_BD: function(tx){
       tx.executeSql('CREATE TABLE IF NOT EXISTS descuento(des_id INTEGER PRIMARY KEY ASC, ter_id int, item_id int,des_valorDescuento varchar(45),des_porcentaje varchar(45),des_estado varchar(45),des_fechaCreacion vachar(45),des_usuarioCreacion varchar(45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS item (item_id integer primary key asc,item_referencia varchar(45),item_codigo varchar(45),item_descripcion varchar(45),item_cantidadBase varchar(45),item_stock varchar(45),item_estado varchar(45),item_fechaCreacion varchar(45),item_usuarioCreacion varchar(45))');   
       tx.executeSql('CREATE TABLE IF NOT EXISTS maestro (mae_id integer primary key asc,mae_tipo varchar(45),mae_descripcion varchar(45),mae_moneda varchar(45),mae_fechaCreacion varchar(45),mae_usuarioCreacion varchar(45),mae_estado varchar(45),usu_id int,suc_id int)');
       tx.executeSql('CREATE TABLE IF NOT EXISTS pedido (ped_id integer primary key asc,ter_id int,mae_id int,pto_id int,ped_fechapedido varchar(45),ped_fechaEntrega varchar(45),ped_observaciones varchar(45),ped_observaciones2 varchar(45),ped_ordenCompra varchar(45),ped_referencia varchar(45),ped_valorNeto varchar(45),ped_descuento varchar(45),ped_impuesto varchar(45),ped_valorTotal varchar(45),ped_valorFacturado varchar(45),ped_estado varchar(45),ped_nroPedidoERP varchar(45),ped_nroFacturaERP varchar(45),ped_estadoERP varchar(45),ped_medioDePago varchar(45),ped_estadoDePago varchar(45),ped_saldo varchar(45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS pedido_detalle (pdet_id integer primary key ASC,ped_id int,mae_id int,item_id int,pdet_descripcion varchar(45),pdet_cantidad varchar(45),pdet_valorImpuesto varchar(45),pdet_porcentajeDescuento  varchar(45),pdet_descuento varchar(45),pdet_valorNeto varchar(45),pdet_fechaCreacion varchar(45),pdet_usuarioCreacion varchar(45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS precio (pre_id integer primary key ASC,item_id int,mae_id int,pre_unidad varchar(45),pre_precio varchar(45),pre_factor varchar(45),pre_fechaCreacion varchar(45),pre_usuarioCreacion varchar (45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS punto_envio (pto_id integer PRIMARY KEY asc,pto_nombre varchar(45),pto_estado varchar(45),pto_fechaCreacion varchar(45),pto_usuarioCreacion varchar(45),suc_id int)');
       tx.executeSql('CREATE TABLE IF NOT EXISTS sucursal (suc_id int,suc_nombre varchar(45),ter_id int, suc_tipo varchar(45),suc_direccion varchar(45),suc_telefono1 varchar(45),suc_telefono2 varchar(45),suc_codigoPostal varchar(45),suc_ciudad varchar(45),suc_depto varchar(45),suc_pais varchar(45),suc_nombreContacto varchar(45),suc_mailCcontacto varchar(45),suc_condicionPago varchar(45),suc_bloqueoCupo varchar(45),suc_bloqueomora varchar(45),suc_cupoCredito varchar(45),suc_estado varchar(45),suc_fechaCreacion varchar(45),suc_usuarioCreacion  varchar(45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS tercero (ter id integer PRIMARY key asc, ter_identificacion varchar(45),ter_tipoIdentificacion  varchar(45),ter_razonSocial  varchar(45),ter_estado varchar(45),ter_esVendedor varchar(45), ter_esCliente varchar(45),ter_esProveedor  varchar(45),ter_fechaCreacion varchar(45),ter_usuario_Creacion varchar(45))');
       tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (usu_id integer PRIMARY key asc, usu_cedula varchar(45),usu_nombre varchar(45),usu_indActivo varchar(45),usu_username varchar(45),usu_password varchar(45),usu_empresa varchar(45),usu_nitEmpresa varchar(45),usu_fechaCreacion varchar(45),usu_usuarioCreacion  varchar(45))');
    },

    insertRecord: function(tx){
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

                query = 'INSERT INTO pedido(ped_nroPedidoERP, ped_fechapedido, ped_observaciones, ped_valorTotal) values("123", "' + dataparse[0]['Fecha_Pedido'] + '", "' + dataparse[0]['Sucursal'] + '", "' + dataparse[0]['Valor'] + '")'
                SINCRONIZAR_NUEVOUSUARIO(query);
              },
              error: function (response) {
                console.log("Error");
                console.log(response.statusCode);
              }
          });
      tx.executeSql(query);
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
    }
}

function submenu(opcion){
  // A–adimos la clase al li presionado
	addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		
	// Recogemos mediante ajax el contenido del html segœn la opci—n clickeada en el menu
	xhReq.open("GET", "opciones/"+opcionMenu+"/opcion"+opcion+".html", false);
	xhReq.send(null);
	document.getElementById("contenidoCuerpo").innerHTML=xhReq.responseText;
	
  myScroll = new iScroll('wrapper', { hideScrollbar: true });	
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

  //var element = document.getElementById("contenidoCuerpo");
  //eval(element.firstChild.innerHTML);
}

function GetListaPedidos() {
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
            var x = 1;
            var lista = $('#divPedidos');
            var status;

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

              $("#divPedidos").append(lista);
          },
          error: function (response) {
              console.log("Error");
              console.log(response.statusCode);
          }
        });
      }


function SINCRONIZAR_NUEVOUSUARIO(query){
  self.conexion.transaction(function(tx,rs){
    tx.executeSql(query);
  });
}

function ConsultarClientes(tx){
  self.conexion.transaction(function(tx,rs){
  tx.executeSql('SELECT * from pedido',[],
    function(tx,rs) {
        for (var a = 0; a < rs.rows.length; a++) {
             var elemento=rs.rows.item(a);
            }

        navigator.notification.alert(elemento.ped_nroPedidoERP);
        console.log(elemento.ped_nroPedidoERP);
    },
    function(tx, err) {
        alert('Error insertando, intente nuevamente por favor');
    });
  });
}