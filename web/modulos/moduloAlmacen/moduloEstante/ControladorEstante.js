var  ctx1 = document.getElementById('myChart1').getContext('2d');
var  ctx2 = document.getElementById('myChart2').getContext('2d');
var  ctx3 = document.getElementById('myChart3').getContext('2d');
var  ctx4 = document.getElementById('myChart4').getContext('2d');
var  ctx5 = document.getElementById('myChart5').getContext('2d');
var  ctx6 = document.getElementById('myChart6').getContext('2d');

var  padreG1 = document.getElementById('padreG1');
var  padreG2 = document.getElementById('padreG2');
var  padreG3 = document.getElementById('padreG3');
var  padreG4 = document.getElementById('padreG4');
var  padreG5 = document.getElementById('padreG5');
var  padreG6 = document.getElementById('padreG6');

var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;

export function asignarOnClick() {
    for (let i = 1; i < 7; i++) {        
        
        let padres = document.getElementById('padreG' + i);
               
        padres.onclick = function () {
            fetch('moduloAlmacen/moduloEstante/vista_Estante.html')
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (html) {
                        // Insertar el HTML en el DOM
                                                
                        document.getElementById('contenedorPrincipal').innerHTML = html;
                                                
                        // Cargar el controlador JS
                        let script = document.createElement('script');
                        script.src = 'moduloAlmacen/moduloEstante/ControladorEstante.js';
                        document.body.appendChild(script);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        };
    }
}

export function cambiarTitulo() {
    document.title = "Almacen";
}

export function cargarGraficas() {
    let data0 = {
        datasets: [{
                label: 'Existencias',
                data: [20, 80],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    let data1 = {
        datasets: [{
                label: 'Existencias',
                data: [30, 70],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    let data2 = {
        datasets: [{
                label: 'Existencias',
                data: [50, 50],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    let data3 = {
        datasets: [{
                label: 'Existencias',
                data: [70, 30],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    let data4 = {
        datasets: [{
                label: 'Existencias',
                data: [90, 10],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    let options = {
        tooltips: {
            enabled: true
        },
        cutout: '70%',
        animation: {
            animateScale: true
        },
        hover: {
            mode: null
        },
        responsive: true,
        maintainAspectRatio: false
    };
    
    

    chart1 = new Chart('myChart1', {
        type: 'doughnut',
        data: data0,
        options: options
    });

    chart2 = new Chart('myChart2', {
        type: 'doughnut',
        data: data0,
        options: options
    });

    chart3 = new Chart('myChart3', {
        type: 'doughnut',
        data: data1,
        options: options
    });

    chart4 = new Chart('myChart4', {
        type: 'doughnut',
        data: data2,
        options: options
    });

    chart5 = new Chart('myChart5', {
        type: 'doughnut',
        data: data3,
        options: options
    });

    chart6 = new Chart('myChart6', {
        type: 'doughnut',
        data: data4,
        options: options
    });

}

function updateStatus() {
    
    //--------------------------------------------
    let porcentaje = chart1.data.datasets[0].data[1];
    

    if (porcentaje >= 80) {

        padreG1.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG1.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG1.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG1.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG1.style.backgroundColor = '#EA5455';
    }

    //--------------------------------------------
    porcentaje = chart2.data.datasets[0].data[1];
    
    if (porcentaje >= 80) {

        padreG2.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG2.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG2.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG2.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG2.style.backgroundColor = '#EA5455';
    }

    //--------------------------------------------
    porcentaje = chart3.data.datasets[0].data[1];
    
    if (porcentaje >= 80) {

        padreG3.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG3.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG3.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG3.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG3.style.backgroundColor = '#EA5455';
    }

    //--------------------------------------------
    porcentaje = chart4.data.datasets[0].data[1];
    

    if (porcentaje >= 80) {

        padreG4.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG4.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG4.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG4.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG4.style.backgroundColor = '#EA5455';
    }

    //--------------------------------------------
    porcentaje = chart5.data.datasets[0].data[1];
    
    if (porcentaje >= 80) {

        padreG5.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG5.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG5.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG5.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG5.style.backgroundColor = '#EA5455';
    }

    //--------------------------------------------
    porcentaje = chart6.data.datasets[0].data[1];
    
    if (porcentaje >= 80) {

        padreG6.style.backgroundColor = '#ADE792';
    } else if (porcentaje >= 60 && porcentaje <= 79) {

        padreG6.style.backgroundColor = '#C9F4AA';
    } else if (porcentaje >= 40 && porcentaje <= 59) {

        padreG6.style.backgroundColor = '#FFE15D';
    } else if (porcentaje >= 20 && porcentaje <= 39) {

        padreG6.style.backgroundColor = '#FF9551';
    } else if (porcentaje <= 19) {

        padreG6.style.backgroundColor = '#EA5455';
    }

}

cargarGraficas();
updateStatus();
cambiarTitulo();
//asignarOnClick();
