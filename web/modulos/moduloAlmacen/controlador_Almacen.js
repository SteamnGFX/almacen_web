var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctx4 = document.getElementById('myChart4').getContext('2d');
var ctx5 = document.getElementById('myChart5').getContext('2d');
var ctx6 = document.getElementById('myChart6').getContext('2d');

var padreG1 = document.getElementById('padreG1');
var padreG2 = document.getElementById('padreG2');
var padreG3 = document.getElementById('padreG3');
var padreG4 = document.getElementById('padreG4');
var padreG5 = document.getElementById('padreG5');
var padreG6 = document.getElementById('padreG6');

var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;

function cambiarTitulo(){
    document.title = "Almacen";
}

function cargarGraficas() {
    var data = {
        datasets: [{
                label: 'Existencias',
                data: [20, 80],
                backgroundColor: ['#27368B', '#FFFFFF']
            }]
    };

    var options = {
        tooltips: {
            enabled: true
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    var dataset = context.chart.data.datasets[context.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[context.dataIndex];
                    var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                    return percentage + "%";
                },
                color: '#ffffff',
                font: {
                    size: '20'
                }
            }
        },
        cutout: '80%',
        animation: {
            animateScale: true
        },

        hover: {
            mode: null
        }
    };

    chart1 = new Chart('myChart1', {
        type: 'doughnut',
        data: data,
        options: options
    });

    chart2 = new Chart('myChart2', {
        type: 'doughnut',
        data: data,
        options: options
    });

    chart3 = new Chart('myChart3', {
        type: 'doughnut',
        data: data,
        options: options
    });

    chart4 = new Chart('myChart4', {
        type: 'doughnut',
        data: data,
        options: options
    });

    chart5 = new Chart('myChart5', {
        type: 'doughnut',
        data: data,
        options: options
    });

    chart6 = new Chart('myChart6', {
        type: 'doughnut',
        data: data,
        options: options
    });

}

function updateStatus() {
    var percentage = chart1.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG1.style.backgroundColor = '#FFFFFF';
    } else if (percentage <= 0) {

        padreG1.style.backgroundColor = '#4CAF50';
    } else {

        padreG1.style.backgroundColor = '#09EF6B';
    }

    var percentage = chart2.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG2.style.backgroundColor = '#F44336';
    } else if (percentage <= 0) {

        padreG2.style.backgroundColor = '#4CAF50';
    } else {

        padreG2.style.backgroundColor = '#4CAF50';
    }

    var percentage = chart3.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG3.style.backgroundColor = '#F44336';
    } else if (percentage <= 0) {

        padreG3.style.backgroundColor = '#4CAF50';
    } else {

        padreG3.style.backgroundColor = '#4CAF50';
    }

    var percentage = chart4.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG4.style.backgroundColor = '#F44336';
    } else if (percentage <= 0) {

        padreG4.style.backgroundColor = '#4CAF50';
    } else {

        padreG4.style.backgroundColor = '#4CAF50';
    }

    var percentage = chart5.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG5.style.backgroundColor = '#F44336';
    } else if (percentage <= 0) {

        padreG5.style.backgroundColor = '#4CAF50';
    } else {

        padreG5.style.backgroundColor = '#4CAF50';
    }

    var percentage = chart6.data.datasets[0].data[0];

    if (percentage >= 100) {

        padreG6.style.backgroundColor = '#F44336';
    } else if (percentage <= 0) {

        padreG6.style.backgroundColor = '#4CAF50';
    } else {

        padreG6.style.backgroundColor = '#4CAF50';
    }

}

cargarGraficas();
updateStatus();
cambiarTitulo();
