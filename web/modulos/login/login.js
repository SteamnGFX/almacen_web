/* global Swal */
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});


eliminarCache();

document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevención de comportamiento predeterminado del formulario
    login();// Llamada a la función de JavaScript
});

function eliminarCache() {
    sessionStorage.clear();
    if (localStorage.getItem("intento") === "1") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'error',
            title: 'Debes de identificarte para continuar!'
        });
        localStorage.clear();
    }
}



function login() {
    let datos = null;
    let params = null;

    let usuario = new Object();
    usuario = new Object();

    usuario.usuario = document.getElementById("user").value;
    usuario.contrasenia = document.getElementById("pass").value;

    //Variable
    datos = {
        credenciales: JSON.stringify(usuario)
    };


    params = new URLSearchParams(datos);

    fetch("api/log/in?",
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
                    console.log('Error interno del servidor. Intente nuevamente más tarde.');
                    return;
                }

                if (data.error) {
                    document.getElementById("lblError").innerHTML = "Usuario / Contraseña incorrectos";
                    eliminarCache();
                } else {
                    document.getElementById("lblError").innerHTML = "";
                    sessionStorage.setItem("usuario", JSON.stringify(data));
                    window.location = "modulos/Inicio.html";
                }
            });
}
