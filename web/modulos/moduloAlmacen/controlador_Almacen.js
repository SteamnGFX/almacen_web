


var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completado', 'Pendiente'],
      datasets: [{
        data: [75, 25],
        backgroundColor: ['#28a745', '#dc3545']
      }]
    },
    options: {
      cutout: '90%',
      animation: {
        animateRotate: false,
        animateScale: true
      },
      tooltips: {
        enabled: false
      }
    }
  });

  var status = document.getElementById('status');
  myChart.options.events = ['click'];
  myChart.options.onClick = function(evt, element) {
    if (element && element[0]) {
      var percent = element[0]._model.circumference / (Math.PI * 2) * 100;
      status.innerHTML = 'Progreso: ' + Math.round(percent) + '%';
      if (percent >= 100) {
        document.querySelector('.position-relative').style.backgroundColor = '#28a745';
      } else if (percent <= 0) {
        document.querySelector('.position-relative').style.backgroundColor = '#dc3545';
      } else {
        document.querySelector('.position-relative').style.backgroundColor = 'linear-gradient(to right, #28a745 ' + percent + '%, #dc3545 ' + percent + '%)';
      }
    }
  };