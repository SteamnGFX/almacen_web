function cargarInicio() {
    window.location = "modulos/Inicio.html";
    // Crear una etiqueta <script> y agregar los atributos necesarios
    var dataTableScript = document.createElement('script');
    dataTableScript.src = 'datables.min.js';
    
    
    dataTableScript.type = 'text/javascript';
    dataTableScript.async = true;

// Obtener el elemento <head> de la página y agregar el script de DataTable
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(dataTableScript);

}

function cargarAlmacen() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "bold";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch('moduloAlmacen/vista_Almacen.html')
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                // Insertar el HTML en el DOM
                document.getElementById('contenedorPrincipal').innerHTML = html;


                // Cargar el controlador JS
                var script = document.createElement('script');
                script.src = 'moduloAlmacen/controlador_Almacen.js';
                document.body.appendChild(script);
            })
            .catch(function (error) {
                console.error(error);
            });

}
function cargarVistaProducto() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "bold";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch("moduloAlmacen/moduloVistaProducto/view_Producto.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}
function cargarVistaEstante() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "bold";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch("modulos/moduloAlmacen/moduloVistaProducto/moduloEstante/view_Estante.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}

function cargarEmpleado() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "bold";

    fetch("moduloEmpleado/vista_Empleado.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
                import("../modulos/moduloEmpleado/ControladorEmpleado.js").then(
                        function (controller) {
                            moduloEmpleado = controller;
                            moduloEmpleado.inicializar();
                        }
                );
            }
    );
}

function cargarProducto() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "";
    document.getElementById("navbar-productos").style.fontWeight = "bold";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch("modulos/moduloProducto/view_Producto.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}
function cargarAgregarProducto() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "";
    document.getElementById("navbar-productos").style.fontWeight = "bold";
    document.getElementById("navbar-reporte").style.fontWeight = "";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch("moduloProducto/moduloAgregarProducto/view_AgregarProducto.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}
function cargarReporte() {
    document.getElementById("navbar-inicio").style.fontWeight = "";
    document.getElementById("navbar-almacen").style.fontWeight = "";
    document.getElementById("navbar-productos").style.fontWeight = "";
    document.getElementById("navbar-reporte").style.fontWeight = "bold";
    document.getElementById("navbar-empleados").style.fontWeight = "";

    fetch("modulos/moduloReporte/view_Reporte.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            ).then(
            function (html) {
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}



