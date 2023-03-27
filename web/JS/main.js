//Inicializamos el metodo general
inicializar();
function inicializar() {
    comprobarSesion();
    leerUsuario();
}

function comprobarSesion() {

}

function leerUsuario() {
    let emp = JSON.parse(sessionStorage.getItem("usuario"));

    if (emp !== null) {
        document.getElementById("txtUsuario").innerHTML = emp.nombre + " - " + emp.usuario.rol;
    }

    console.log(document.getElementById("txtUsuario").textContent);

    if (document.getElementById("txtUsuario").textContent === "USER NOT IDENTIFY") {
        
        localStorage.setItem("intento", "1");

            window.location = "../index.html";
       
    }
}

function cargarInicio() {
    window.location = "Inicio.html";
}

function cerrarSesion(){
    window.location = "../index.html";
    localStorage.clear();
    sessionStorage.clear();
}