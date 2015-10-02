 var app = { 

	 peticionState : false,

     // Application Constructor 
   initialize: function() { 
  	 this.bindEvents(); 
   }, 

   bindEvents: function() { 
 	   document.addEventListener('deviceready', this.onDeviceReady, false); 
   },

   onDeviceReady: function() { 
	    db = window.sqlitePlugin.openDatabase("PedidosMobileDB", "1.0", "Pedidos mobile DB", 200000);
      db.transaction(app.Crear_BD, app.errorCB, app.successCB);
      //app.process('GET','https://api.mercadolibre.com/sites/MLA/search?q=ipod',"");
   },

    /* metodo :     String - GET / POST
     * urlService : String - Direccion de consumo WS
     * callback :   function()  - Metodo que recibirá la respuesta, sino se envia por defecto sera onResponse */
	 process : function(metodo , urlService, callback) {
   	   if(callback == undefined || callback == "") { callback = app.onResponse; }
   	   Ajax.buildRequest(metodo, urlService, callback);
   	   app.peticionState = true;
	 },

   onCliente : function(){
      // Hacemos algo con la peticion ( feel free) ponga aqui su codigo
      //console.log("Ejecutando");
      if(Ajax.checkState('ped_cliente1') == 200){
          
          navigator.notification.alert("okokokokok ");
          app.peticionState = false;
          
          var msg = JSON.parse(Ajax.getResponse());
          
          navigator.notification.alert("okokokokok "+msg.length);

          for (i = 0; i < msg.length; i++) {
              var option = $('<option/>');
              option.attr('value', msg[i]['customer']).text(msg[i]['customer']);
              $("#ped_cliente").append(option);
              $("#resultado4").append(msg[i]['customer']);
          }
          $('#ped_cliente').selectmenu().selectmenu('refresh',true);
          //app.process('GET','http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetSucursalList',app.onSucursal);
      }
   },

   onSucursal : function(){
      // Hacemos algo con la peticion ( feel free) ponga aqui su codigo
      //console.log("Ejecutando");
      if(Ajax.checkState('ped_cliente1') == 200){
          app.peticionState = false;
          
          var msg = JSON.parse(Ajax.getResponse());
          
          for (i = 0; i < msg.length; i++) {
              var option = $('<option/>');
              option.attr('value', msg[i]['sucursal']).text(msg[i]['sucursal']);
              $("#ped_sucursal").append(option);
          }
          $('#ped_sucursal').selectmenu().selectmenu('refresh',true);
          app.process('GET','http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetPtoEnvioList',app.onPtoEnvio);
      }
   },

   onPtoEnvio : function(){
      // Hacemos algo con la peticion ( feel free) ponga aqui su codigo
      //console.log("Ejecutando");
      if(Ajax.checkState('ped_cliente1') == 200){
          app.peticionState = false;
          
          var msg = JSON.parse(Ajax.getResponse());
          
          for (i = 0; i < msg.length; i++) {
              var option = $('<option/>');
              option.attr('value', msg[i]['ptoenvio']).text(msg[i]['ptoenvio']);
              $("#ped_puntoEnvio").append(option);
          }
          $('#ped_puntoEnvio').selectmenu().selectmenu('refresh',true);
      }
   },

	 onResponse : function(){
   		// Hacemos algo con la peticion ( feel free) ponga aqui su codigo
   		//console.log("Ejecutando");
    	if(Ajax.checkState('ped_cliente1') == 200){
	        app.peticionState = false;
	        
          var msg = JSON.parse(Ajax.getResponse());
          
          for (i = 0; i < msg.length; i++) {
              var option = $('<option/>');
              option.attr('value', msg[i]['ptoenvio']).text(msg[i]['ptoenvio']);
              $("#ped_puntoEnvio").append(option);
          }
          $('#ped_puntoEnvio').selectmenu().selectmenu('refresh',true);
    	}
	 },

   errorCB : function(err) {
     navigator.notification.alert("Error en la operación "+err, {},"Operación fallo");
   },

   geo : function(){
      $("#resultado4").html("Esperando al GPS");
      var watch = navigator.geolocation.watchPosition(app.onInfo, app.OnError,{timeout: 30000});
   },

   onInfo : function(info){
      $("#resultado4").html('Latitud:' + info.coords.latitude + '<br>'+
                            'Longitud:' + info.coords.longitude + '<br>'+ 
                            'Altitud:' + info.coords.altitude + '<br>'+
                            'Accurancy:' + info.coords.accuracy + '<br>'+
                            'Altutud accuracy:' + info.coords.altitudeAccuracy + '<br>'+
                            'Heading:' + info.coords.heading + '<br>'+
                            'Speed:' + info.coords.speed + '<br>'+
                            'TimeStamp:' + info.timestamp + '<br>'); 
   },

   onError : function(error){
     $("#resultado4").html("code: "+error.code +'<br>'+ 'message: '+error.message);
   },

   successCB: function() {
   	 //navigator.notification.alert("Base de datos creada", {},"Operación ok");
     app.process('GET','http://riapira2289-001-site1.smarterasp.net/DataMobile_Service.svc/Web/GetCustomerList',app.onCliente);     
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
 	}     
 }; 