
 var app = { 

     // Application Constructor 
     initialize: function() { 
         this.bindEvents(); 
     }, 

     bindEvents: function() { 
         document.addEventListener('deviceready', this.onDeviceReady, false); 
         //this.onDeviceReady();
     },

     onDeviceReady: function() { 
      
       navigator.notification.alert('You are the winner!');
       //this.Conectar_BD();
       //

        this.db = window.sqlitePlugin.openDatabase({name: "PedidosMobileDB.db"});

       this.db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS test_table');
          tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

          // demonstrate PRAGMA:
          this.db.executeSql("PRAGMA foreign_keys=ON;", [], function(res) {
            navigator.notification.alert("PRAGMA res: " + JSON.stringify(res));
          }); 
      });

        navigator.notification.alert('You are the winner88888!');
     }, 
     
     Conectar_BD: function() {
       navigator.notification.alert('OK!');
       this.db = window.sqlitePlugin.openDatabase({name: "PedidosMobileDB.db"});
       //window.sqlitePlugin.openDatabase('PedidosMobileDB', '1.0', 'Base de datos de pedidos online version mobile', 500);
       navigator.notification.alert('CONECTADO!');
 	 },

     ExecuteQuery: function(operacion)
     {
        if (this.db == null) {
            this.Conectar_BD();
        }
        navigator.notification.alert('EJECUTADO CONSULTA!');
        this.db.transaction(operacion, function(tx, err){navigator.notification.alert('NOK!');}, function(){navigator.notification.alert('OK!');});
        navigator.notification.alert('EJECUTADO CONSULTA444!');
     },

 	 Crear_BD: function(tx){
 	   tx.executeSql('PRAGMA foreign_keys = ON');
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