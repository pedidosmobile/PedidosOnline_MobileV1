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
