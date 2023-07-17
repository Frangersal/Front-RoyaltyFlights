
document.addEventListener('DOMContentLoaded', function () {
    var currentDate = new Date();
    var selectedDate = document.getElementById('selected-date');

    function generateCalendar(year, month) {
        var calendarBody = document.querySelector('#calendar-body tbody');
        var calendarHeader = document.getElementById('current-month');
        calendarBody.innerHTML = '';
        var date = new Date(year, month);

        calendarHeader.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric', locale: 'es-ES' });

        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        var day = 1;

        for (var i = 0; i < 6; i++) {
            var row = document.createElement('tr');

            for (var j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    var cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (day > lastDay) {
                    break;
                } else {
                    var cell = document.createElement('td');
                    cell.textContent = day;
                    cell.addEventListener('click', selectDate);
                    row.appendChild(cell);
                    day++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    function selectDate(event) {
        var clickedDate = event.target.textContent;
        var month = currentDate.getMonth() + 1;
        var formattedDate = currentDate.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + clickedDate.toString().padStart(2, '0');
        selectedDate.value = formattedDate;

        var selectedCell = document.querySelector('.selected');
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }
        event.target.classList.add('selected');
    }

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

    document.getElementById('prev-month').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    document.getElementById('next-month').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
});


function mostrarInputs() {
    var cantidad = document.getElementById("cantidad").value;
    var inputsContainer = document.getElementById("inputs-container");
    inputsContainer.innerHTML = "";

    for (var i = 1; i <= cantidad; i++) {
        var html = `
        <div class="row">
  <hr>
  <h1>Pasajero ${i}</h1>
  <div class="form-group col-md-5">
    <label for="nombre${i}">Nombre:</label>
    <input type="text" class="form-control" id="nombre${i}" placeholder="Ingresa tu nombre" required>
  </div>
  <div class="col-md-2"></div>
  <div class="form-group col-md-5">
    <label for="apellido${i}">Apellido:</label>
    <input type="text" class="form-control" id="apellido${i}" placeholder="Ingresa tu apellido" required>
  </div>
  <div class="form-group col-md-5">
    <label for="correo${i}">Correo:</label>
    <input type="email" class="form-control" id="correo${i}" placeholder="Ingresa tu correo electrónico" required>
  </div>
  <div class="col-md-2"></div>
  <div class="form-group col-md-5">
    <label for="dpi${i}">DPI:</label>
    <input type="text" class="form-control" id="dpi${i}" placeholder="Ingresa tu DPI" required>
  </div>
  </div>
`;
        inputsContainer.innerHTML += html;
    }
}
