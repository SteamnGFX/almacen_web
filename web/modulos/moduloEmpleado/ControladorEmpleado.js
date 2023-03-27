/* global Swal */

//VARIABLES NECESARIAS PARA FUNCIONAR
let empleados = new Array();

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

function cambiarTitulo() {
    document.title = "Almacén - Gestión Empleados";
}

function cargarModuloCatalogoEmpleados() {
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
                            $('#tblEmpleadosHead').DataTable()
                                    .search(this.value)
                                    .draw();
                        });
                    });
}

function cargarModuloModificarEmpleado() {
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

function loadTabla(data) {
    let cuerpo = "";
    let estatus = "";
    empleados = data;

    empleados.forEach(function (empleado) {

        if (empleado.estatus == 1) {
            estatus = "Activo";
        } else {
            estatus = "Inactivo";
        }

        let registro =
                '<tr id="' + empleados.indexOf(empleado) + '"class="" onclick="moduloEmpleado.selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td class="text-center">' + empleado.nombre + '</td>' +
                '<td class="text-center">' + empleado.apellidoPaterno + " " + empleado.apellidoMaterno + '</td>' +
                '<td class="text-center">' + empleado.telefonoMovil + '</td>' +
                '<td class="text-center">' + empleado.usuario.rol + '</td>' +
                '<td class="text-center">' + estatus + '</td>' +
                '<td class="text-center">' + '<div class="d-flex"> <div class="col"> <img src="../recursos/edit.png" class="imagenTabla" onclick=moduloEmpleado.modificarEmpleado(' + empleados.indexOf(empleado) + ')> </div> <div class="col"><img src="../recursos/remove.png" onclick="moduloEmpleado.eliminarEmpleado(' + empleados.indexOf(empleado) + ',' + empleado.idEmpleado + ')"class="imagenTabla"></div> </div>' + '</td></tr>';
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
        empleado.usuario.Usuario = document.getElementById("txtUsuario").value;
        empleado.usuario.contrasenia = document.getElementById("txtPassword").value;
        empleado.usuario.rol = normalizar(document.getElementById("txtRol").value);
        empleado.numeroUnico = normalizar(document.getElementById("txtNumUnico").value);

        //Variable
        datos = {
            datosEmpleado: JSON.stringify(empleado)
        };


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
                    clean();
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


function guardarDatosEmpleadoSeleccionado(index) {
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
    txtUsuario = empleados[index].usuario.Usuario;
    txtPassword = empleados[index].usuario.contrasenia;
    txtRol = empleados[index].usuario.rol;

    //Dato de estatus
    txtEstatus = empleados[index].estatus;

}

function cargarDatosModificarEmpleado() {
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
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el nombre vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;

    } else if (apellido_paterno === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el apellido vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;

    } else if (apellido_materno === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Apellido Paterno vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (usuario === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Usuario vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (genero === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Genero vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (rol === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el rol vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (password === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener la Contraseña vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (correo_electronico === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el Correo Electronico vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    } else if (rfc === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No puedes tener el RFC vacío!',
            showConfirmButton: false,
            timer: 1500
        });
        return 1;
    }
    return 0;
}
