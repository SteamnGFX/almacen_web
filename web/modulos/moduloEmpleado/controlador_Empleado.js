//VARIABLES NECESARIAS PARA FUNCIONAR

let empleados = new Array();
//let iconoActivo = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style="fill: green;" class="bi bi-circle w-25" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>';
//let iconoInactivo = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style="fill: red;" class="bi bi-circle w-25" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>';
let iconoActivo = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style="fill: green;" class="bi bi-circle-fill w-25" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>';
let iconoInactivo = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style="fill: red;" class="bi bi-circle-fill w-25" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>';
//VARIABLES DONDE GUARDAREMOS AL EMPLEADO SELECCIONADO
//Se guardan en variables lo que seleccione en el catálogo para despues usarlo en el FETCH de modificar
//Variables ID'S
let txtIdEmpleado;
let txtIdPersona;
let txtIdUsuario;

//Variables de persona
let txtNumUnico;
let txtNombre;
let txtApellido_Paterno;
let txtApellido_Materno;
let txtGenero;
let txtFecha_Nacimiento;
let txtRFC;


//Variables de contacto
let txtTelefono;
let txtTelefono_Movil;
let txtCorreo;

//Variables de usuario
let txtUsuario;
let txtPassword;
let txtRol;
//Variable de estatus
let txtEstatus;

export function inicializar() {
    cargarModuloCatalogoEmpleados();
    refrescarTabla();
    cambiarTitulo();
}

export function cambiarTitulo() {
    document.title = "Almacén - Gestión Empleados";
}

export function cargarModuloCatalogoEmpleados() {
    fetch("moduloEmpleado/moduloRegistrarEmpleado/vista_CatalogoEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-modulo").innerHTML = html;
                        
                        refrescarTabla();
                        
                        $('#txtBuscarEmpleado').on('keyup', function () {
                            $('#tblEmpleadosHead').DataTable().search(this.value).draw();
                        });
                        
                    });
}

export function cargarModuloModificarEmpleado() {
    fetch("moduloEmpleado/moduloRegistrarEmpleado/vista_ModificarEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedorPrincipal").innerHTML = html;
                        cargarDatosModificarEmpleado();
                    });
}

export function btnAgregarEmpleado() {
    fetch("moduloEmpleado/moduloRegistrarEmpleado/vista_RegistrarEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-main").innerHTML = html;

                    });
}

export function btnModificarEmpleado() {
    fetch("moduloEmpleado/moduloRegistrarEmpleado/vista_ModificarEmpleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor-main").innerHTML = html;

                    });
}

export function btnVolverCatalogo() {
    fetch("moduloEmpleado/vista_Empleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
                cargarModuloCatalogoEmpleados();
                refrescarTabla();
            }
    );
}

export function refrescarTabla() {
    let url = "../api/empleado/getAll";

    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null)
                {
                    Swal.fire('',
                            'Error interno del servidor. Intente nuevamente mas tarde',
                            'error');
                    return;
                }
                if (data.error != null)
                {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null)
                {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('../../index.html');
                    return;
                }
                loadTabla(data);
                tablaDataTable(data);
            });
}

function tablaDataTable(data) {
    $(document).ready(function () {
        $('#tblEmpleadosHead').DataTable({
            searching: true,
            select: false,
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

let iconoEditar = "xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-pencil-square icono-modificar' viewBox='0 0 16 16'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg>";
let iconoEliminar = 'xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash icono-eliminar" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

function loadTabla(data) {
    let cuerpo = "";
    let estatus = "";
    empleados = data;

    empleados.forEach(function (empleado) {

        estatus = empleado.estatus == 1 ? "<span class='d-inline-block w-75 '>ACTIVO</span>" + iconoActivo : "<span class='d-inline-block w-75 '>INACTIVO</span>" + iconoInactivo;
        
        let registro =
                '<tr id="' + empleados.indexOf(empleado) + '">' +
                '<td class="text-center">' + empleado.nombre + '</td>' +
                '<td class="text-center">' + empleado.apellidoPaterno + " " + empleado.apellidoMaterno + '</td>' +
                '<td class="text-center">' + empleado.telefonoMovil + '</td>' +
                '<td class="text-center">' + empleado.usuario.rol + '</td>' +
                '<td class="text-center">' + estatus + '</td>' +
                '<td class="text-center">' + 
                            '<div class="d-flex"> \n\
                                <div class="col">' +
                                    '<svg ' + 'onclick= moduloEmpleado.modificarEmpleado(' + empleados.indexOf(empleado) + ') ' +
                                    iconoEditar +
                                    
                                '</div>' 
                                +
                                '<div class="col">' +
                                    '<svg ' + 'onclick= moduloEmpleado.eliminarEmpleado(' + empleados.indexOf(empleado) + ',' + empleado.idEmpleado + ')' +
                                    iconoEliminar +
                                    
                                '</div> \n\
                            </div>' + 
                '</td></tr>';
        cuerpo += registro;
    });
    
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}


//Metodo para realizar POST e insertar un EMPLEADO
export function save() {
    if (validarDatos()) {

    } else {
        let datos = null;
        let params = null;

        let empleado = new Object();
        empleado.usuario = new Object();

        if (document.getElementById("txtIdEmpleado").value.trim().length < 1) {
            empleado.idEmpleado = 0;
            empleado.usuario.idUsuario = 0;
        } else {
            empleado.idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);
            empleado.usuario.idUsuario = parseInt(document.getElementById("txtIdUsuario").value);
        }

        //Se guardan en los atributos los valores de los inputs
        empleado.nombre = normalizar(document.getElementById("txtNombre").value);
        empleado.apellidoPaterno = normalizar(document.getElementById("txtApellidoPaterno").value);
        empleado.apellidoMaterno = normalizar(document.getElementById("txtApellidoMaterno").value);
        empleado.genero = normalizar(document.getElementById("txtGenero").value);

        //Datos de contacto
        empleado.telefonoFijo = document.getElementById("txtTelefonoFijo").value;
        empleado.telefonoMovil = document.getElementById("txtTelefonoMovil").value;
        empleado.correo = normalizar(document.getElementById("txtCorreo").value);
        empleado.rfc = normalizar(document.getElementById("txtRfc").value);

        //Datos de usuario
        empleado.usuario.usuario = document.getElementById("txtUsuario").value;
        
        empleado.usuario.contrasenia = document.getElementById("txtPassword").value;
        empleado.usuario.rol = normalizar(document.getElementById("txtRol").value);
        empleado.numeroUnico = normalizar(document.getElementById("txtNumUnico").value);

        //Variable
        datos = {
            datosEmpleado: JSON.stringify(empleado)
        };

        console.log("Datos de Empleado");
        console.log(datos);


        params = new URLSearchParams(datos);

        fetch("../api/empleado/save?",
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    body: params
                })
                .then(response => {
                    return response.json();
                })
                .then(function (data) {
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
                    document.getElementById("txtIdEmpleado").value = data.idEmpleado;
                    document.getElementById("txtIdUsuario").value = data.idUsuario;
                    document.getElementById("txtNumUnico").value = data.usuario.numeroUnico;

                    Swal.fire('', 'Datos del empleado actualizados correctamente!', 'success');
                    
                    cargarModuloCatalogoEmpleados();


                });
        setTimeout(function () {
            btnVolverCatalogo();
        }, 1000);
    }
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

export function modificarEmpleado(index) {
    guardarDatosEmpleadoSeleccionado(index);
    cargarModuloModificarEmpleado();
}

export function eliminarEmpleado(index, idEmpleado) {
    let datos = "";
    let params = "";

    Swal.fire({
        title: '¿Desea confirmar la eliminación del empleado?',
        html:
                'Antes de continuar, por favor confirme si desea eliminar al empleado <b>' + empleados[index].nombre + '</b>',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`
    }).then((result) => {
        /* Si el es confirmado */
        if (result.isConfirmed) {
            Swal.fire('El empleado se ha eliminado correctamente!', '', 'success');

            datos = {
                idEmpleado: idEmpleado
            };

            params = new URLSearchParams(datos);


            fetch("../api/empleado/delete?",
                    {
                        method: "PUT",
                        body: params
                    });

            setTimeout(function () {
                refrescarTabla();
            }, 1000);
            
        } else if (result.isDenied) {
            
        }
    });
}


export function guardarDatosEmpleadoSeleccionado(index) {
    txtIdEmpleado = empleados[index].idEmpleado;
    txtIdPersona = empleados[index].idPersona;
    txtIdUsuario = empleados[index].usuario.idUsuario;

    txtNumUnico = empleados[index].numeroUnico;
    txtNombre = empleados[index].nombre;
    txtApellido_Paterno = empleados[index].apellidoPaterno;
    txtApellido_Materno = empleados[index].apellidoMaterno;
    txtGenero = empleados[index].genero;
    txtFecha_Nacimiento = empleados[index].fechaNacimiento;
    txtRFC = empleados[index].rfc;

    //Datos de contacto
    txtTelefono = empleados[index].telefonoFijo;
    txtTelefono_Movil = empleados[index].telefonoMovil;
    txtCorreo = empleados[index].correo;


    //Datos de usuario
    txtUsuario = empleados[index].usuario.usuario;
    txtPassword = empleados[index].usuario.contrasenia;
    txtRol = empleados[index].usuario.rol;

    //Dato de estatus
    txtEstatus = empleados[index].estatus;

}

export function cargarDatosModificarEmpleado() {
    //Datos no Visibles
    document.getElementById("txtIdEmpleado").value = txtIdEmpleado;
    document.getElementById("txtIdUsuario").value = txtIdUsuario;
    document.getElementById("txtNumUnico").value = txtNumUnico;

    //Datos Visibles
    document.getElementById("txtNombre").value = txtNombre;
    document.getElementById("txtApellidoMaterno").value = txtApellido_Materno;
    document.getElementById("txtApellidoPaterno").value = txtApellido_Paterno;
    document.getElementById("txtTelefonoFijo").value = txtTelefono;
    document.getElementById("txtTelefonoMovil").value = txtTelefono_Movil;
    document.getElementById("txtUsuario").value = txtUsuario;
    document.getElementById("txtPassword").value = txtPassword;
    document.getElementById("txtCorreo").value = txtCorreo;
    document.getElementById("txtRol").value = txtRol;
    document.getElementById("txtRfc").value = txtRFC;
    document.getElementById("txtGenero").value = txtGenero;
}


function validarDatos() {
    let  nombre,
            apellido_paterno,
            apellido_materno,
            genero,
            rfc,
            telefono,
            telefono_movil,
            usuario,
            password,
            rol,
            correo_electronico;

    //Se guardan en los atributos los valores de los inputs
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApellidoPaterno").value;
    apellido_materno = document.getElementById("txtApellidoMaterno").value;
    genero = document.getElementById("txtGenero").value;
    telefono = document.getElementById("txtTelefonoFijo").value;
    telefono_movil = document.getElementById("txtTelefonoMovil").value;
    usuario = document.getElementById("txtUsuario").value;
    password = document.getElementById("txtPassword").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    rfc = document.getElementById("txtRfc").value;
    rol = document.getElementById("txtRol").value;


    if (nombre === "") {
        
        notificacion('error','No puedes tener el nombre vacío!');
        return 1;

    } else if (apellido_paterno === "") {
        
        notificacion('error','No puedes tener el apellido vacío!');
        return 1;

    } else if (apellido_materno === "") {
       
        notificacion('error','No puedes tener el Apellido Paterno vacío!');
        return 1;
    } else if (usuario === "") {
       
        notificacion('error','No puedes tener el Usuario vacío!');
        return 1;
    } else if (genero === "") {
        
        notificacion('error','No puedes tener el Genero vacío!');
        return 1;
    } else if (rol === "") {
        
        notificacion('error','No puedes tener el rol vacío!');
        return 1;
    } else if (password === "") {
        
        notificacion('error','No puedes tener la Contraseña vacío!');
        return 1;
    } else if (correo_electronico === "") {
        
        notificacion('error','No puedes tener el Correo Electronico vacío!');
        return 1;
    } else if (rfc === "") {
        
        notificacion('error','No puedes tener el RFC vacío!');
        return 1;
    }
    return 0;
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