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
        document.getElementById("lblUsuario").innerHTML = emp.nombre + " - " + emp.usuario.rol;
    }    

    if (document.getElementById("lblUsuario").textContent === "USER NOT IDENTIFY") {
        
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