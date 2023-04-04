/* global Swal */

let iconoActivo = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' style='fill: green;' class='bi bi-circle-fill w-25' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>";
let iconoInactivo = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' style='fill: red;' class='bi bi-circle-fill w-25' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>";
let productosJSON = [];
let txtIdProducto;
let txtNombre;
let txtTipo;
let txtExistencias;
let txtProveedor;
let txtFecha;
let txtMarca;
let txtDescripcion;
let txtEstatus;

export function inicializar() {
    refrescarTabla();
    document.title = "Almacén - Gestión Producto";

}

async function cargarModuloCatalogoProducto() {

    let response = await fetch("moduloProducto/vista_Producto.html");
    const html = await response.text();
    document.getElementById("contenedorPrincipal").innerHTML = html;
    refrescarTabla();

}

export async function btnAgregarProducto() {

    let response = await fetch("moduloProducto/moduloAgregarProducto/vista_AgregarProducto.html");
    const html = await response.text();
    document.getElementById("contenedor-main").innerHTML = html;

}

export async function btnModificarProducto(indice) {

    let response = await fetch("moduloProducto/moduloAgregarProducto/vista_AgregarProducto.html");
    const html = await response.text();
    traerDatos(indice);
    document.getElementById("contenedor-main").innerHTML = html;
    document.getElementById("titulo-modulo").innerHTML = "Modificar Producto";
    insertarDatos();

}

export async function btnVolverCatalogo() {

    let response = await fetch("moduloProducto/vista_Producto.html");
    const html = await response.text();
    document.getElementById("contenedorPrincipal").innerHTML = html;
    cargarModuloCatalogoProducto();
    refrescarTabla();

}

//Función para refrescarTabla con BaseDeDatos
async function refrescarTabla() {
    console.log("RERESCANDO TABLA");
    
    let response = await fetch("../api/producto/getAll?filtro=&");
    const productosAPI = await response.json();

    if (productosAPI.exception != null) {
        Swal.fire('',
                'Error interno del servidor. Intente nuevamente mas tarde',
                'error');
        return;
    }

    if (productosAPI.error != null) {
        Swal.fire('', productosAPI.error, 'warning');
        return;
    }

    if (productosAPI.errorsec != null) {
        Swal.fire('', productosAPI.errorsec, 'error');
        window.location.replace('../../index.html');
        return;
    }
    
    productosJSON = productosAPI;
    cargarTabla(productosJSON);
    tablaDataTable(productosJSON);
    
}


let iconoEditar = " xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-pencil-square icono-modificar' viewBox='0 0 16 16'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
let iconoEliminar = ` xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-trash icono-eliminar' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>`;

export function cargarTabla(datos_producto) {
    let cuerpo = "";
    let estatus = "";    
    
    datos_producto.forEach(function (producto) {

        estatus = producto.estatus == 1 ? "<span class='d-inline-block w-75 '>ACTIVO</span>" + iconoActivo : "<span class='d-inline-block w-75 '>INACTIVO</span>" + iconoInactivo;

        let registro =
                '<tr >' +
                '<td class="text-center">' + producto.nombre + '</td>' +
                '<td class="text-center">' + producto.tipo + '</td>' +
                '<td class="text-center">' + producto.marca + '</td>' +
                '<td class="text-center">' + producto.existencias + '</td>' +
                '<td class="text-center">' + producto.proveedor + '</td>' +
                '<td class="text-center">' + estatus + '</td>' +
                '<td class="text-center">' +
                '<div class="d-flex">' +
                '<div class="col ">' +
                '<svg onclick= moduloProducto.btnModificarProducto(' + datos_producto.indexOf(producto) + ') ' + iconoEditar +
                '</div>' +
                '<div class="col ">' +
                '<svg ' + 'onclick= moduloProducto.borrarProducto(' + producto.idProducto + ')' + iconoEliminar +
                '</div>' +
                '</div>' +
                '</td></tr>';
        cuerpo += registro;
    });

    document.getElementById("tblProductos").innerHTML = cuerpo;
}

export async function save() {
    if (validar()) {
        let datos = null;
        let params = null;
        let producto = new Object();
        let mensaje = "";

        if (document.getElementById("txtIdProducto").value.trim().length < 1) {
            producto.idProducto = 0;
            mensaje = "Producto insertado correctamente!";
        } else {
            producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
            mensaje = "Producto actualizado correctamente";
        }

        producto.nombre = normalizar(document.getElementById("txtNombre").value);
        producto.tipo = normalizar(document.getElementById("txtTipo").value);
        producto.existencias = normalizar(document.getElementById("txtExistencias").value);
        producto.proveedor = normalizar(document.getElementById("txtProveedor").value);
        producto.fechaEntrada = normalizar(document.getElementById("txtFecha").value);
        producto.marca = normalizar(document.getElementById("txtMarca").value);
        producto.descripcion = normalizar(document.getElementById("txtDescripcion").value);

        //Variable
        datos = {
            datosProducto: JSON.stringify(producto)
        };

        params = new URLSearchParams(datos);

        let response = await fetch("../api/producto/save?", {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: params
        });

        const data = await response.json();

        if (data.exception != null) {
            Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
            return;
        }
        if (data.error != null) {
            Swal.fire('', data.error, 'warning');
            return;
        }
        if (data.errorperm != null) {
            Swal.fire('', 'No tiene permiso para realizar esta acción.', 'warning');
            return;
        }

        document.getElementById("txtIdProducto").value = data.IdProducto;

        Swal.fire('', mensaje, 'success');

        setTimeout(function () {
            cargarModuloCatalogoProducto();
        }, 1000);
    }
}

export async function borrarProducto(indice) {
    let params = null;
    let datos = null;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    const result = await Swal.fire({
        title: 'Estás seguro de eliminar?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Tú registro se ha eliminado.',
                'success'
                );

        datos = {
            idProducto: indice
        };

        params = new URLSearchParams(datos);

        const response = await fetch("../api/producto/delete?", {
            method: "PUT",
            body: params
        });

        setTimeout(function () {
            refrescarTabla();
        }, 1000);

    } else if (result.isDenied) {
        Swal.fire('Se cancelo la eliminación!', '', 'info');
    }
}

export function validar() {

    if (
            document.getElementById("txtNombre").value === "" ||
            document.getElementById("txtTipo").value === "" ||
            document.getElementById("txtExistencias").value === "" ||
            document.getElementById("txtProveedor").value === "" ||
            document.getElementById("txtFecha").value === "" ||
            document.getElementById("txtMarca").value === "" ||
            document.getElementById("txtDescripcion").value === ""

            ) {

        if (document.getElementById("txtNombre").value === "") {
            notificacion("error", "No puedes tener el nombre vacio!");
            return false;
        }

        if (document.getElementById("txtTipo").value === "") {
            notificacion("error", "No puedes tener el tipo vacio!");
            return false;
        }

        if (document.getElementById("txtExistencias").value === "") {
            notificacion("error", "No puedes tener exitencias vacias!");
            return false;
        }

        if (document.getElementById("txtProveedor").value === "") {
            notificacion("error", "No puedes tener el proveedor vacio!");
            return false;
        }

        if (document.getElementById("txtFecha").value === "") {
            notificacion("error", "No puedes tener la fecha vacia!");
            return false;
        }

        if (document.getElementById("txtMarca").value === "") {
            notificacion("error", "No puedes tener la marca vacia!");
            return false;
        }

        if (document.getElementById("txtDescripcion").value === "") {
            notificacion("error", "No puedes tener el nombre vacio!");
            return false;
        }
    }

    return true;
}

function normalizar(texto) {

    texto = texto.toUpperCase();
    for (let i = 0; i < texto.length; i++) {
        texto = texto.replace("Á", "A");
        texto = texto.replace("É", "E");
        texto = texto.replace("Í", "I");
        texto = texto.replace("Ó", "O");
        texto = texto.replace("Ú", "U");
    }

    return texto;

}

function traerDatos(indice) {
    
    txtIdProducto = productosJSON[indice].idProducto;
    txtNombre = productosJSON[indice].nombre;
    txtTipo = productosJSON[indice].tipo;
    txtExistencias = productosJSON[indice].existencias;
    txtProveedor = productosJSON[indice].proveedor;
    txtFecha = productosJSON[indice].fechaEntrada;
    txtMarca = productosJSON[indice].marca;
    txtDescripcion = productosJSON[indice].descripcion;
    txtEstatus = productosJSON[indice].estatus;
}

function insertarDatos() {

    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtTipo").value = txtTipo;
    document.getElementById("txtExistencias").value = txtExistencias;
    document.getElementById("txtProveedor").value = txtProveedor;
    document.getElementById("txtFecha").value = txtFecha;
    document.getElementById("txtMarca").value = txtMarca;
    document.getElementById("txtDescripcion").value = txtDescripcion;
    document.getElementById("txtIdProducto").value = txtIdProducto;
}

function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblProductosHead').DataTable({
            searching: true,
            select: true,
            retrieve: true,
            toggleable: false,
            info: false,
            data: data.data,
            language: {
                "decimal": "",
                "emptyTable": "No hay datos que mostrar",
                "info": "Mostrando <b>_START_ </b>de <b>_END_</b> de total de <b> _TOTAL_</b> entradas",
                "infoEmpty": "Mostrado 0 de 0 a 0 entradas",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrando _MENU_ entradas",
                "loadingRecords": "Cargando...",
                "processing": "",
                "search": "Buscar:",
                "zeroRecords": "No se encontraron coincidencias",
                "paginate": {
                    "first": "Primera",
                    "last": "Ultima",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ":Activar para ordenar columna ascendente",
                    "sortDescending": ": Activar para ordenar la columna descendente"
                }
            }
        });
    });
}

function notificacion(tipo, mensaje) {
    Swal.fire({
        position: 'center',
        icon: tipo,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}



