
document.addEventListener('DOMContentLoaded', function () {
    let currentDate = new Date();
    let selectedDate = document.getElementById('selected-date');

    function generateCalendar(year, month) {
        let calendarBody = document.querySelector('#calendar-body tbody');
        let calendarHeader = document.getElementById('current-month');
        calendarBody.innerHTML = '';
        let date = new Date(year, month);

        calendarHeader.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric', locale: 'es-ES' });

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let day = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (day > lastDay) {
                    break;
                } else {
                    let cell = document.createElement('td');
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
        let clickedDate = event.target.textContent;
        let month = currentDate.getMonth() + 1;
        let formattedDate = currentDate.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + clickedDate.toString().padStart(2, '0');
        selectedDate.value = formattedDate;

        let selectedCell = document.querySelector('.selected');
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
    let cantidad = document.getElementById("cantidad").value;
    let inputsContainer = document.getElementById("inputs-container");
    inputsContainer.innerHTML = "";

    for (let i = 1; i <= cantidad; i++) {
        let html = `
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

  <div class="form-group col-md-5">
    <label for="peso${i}">peso:</label>
    <input type="text" class="form-control" id="peso${i}" placeholder="Ingresa tu peso en kilos" required>
  </div>
  </div>
`;
        inputsContainer.innerHTML += html;
    }
}


/*** */
document.querySelector(".btn-cita").addEventListener("click", async function () {
    let cantidad = document.getElementById("cantidad").value;
    let id_paquete = parseInt(document.getElementById("tipoViaje").value);
    let selectedDate = document.getElementById("selected-date").value;
    let selectedHours = Array.from(document.querySelectorAll(".option-hora:checked")).map(option => option.value);

    let pasajeros = [];
    let idviaje = parseInt(Date.now().toString()); // Asignar un ID de viaje
    let horaViaje = selectedHours[0]; // Asignar la misma hora para todos los pasajeros
    let precioPaquete = await APIpaquetePrecio(id_paquete);

    for (let i = 1; i <= cantidad; i++) {
        let nombres = document.getElementById("nombre" + i).value;
        let apellidos = document.getElementById("apellido" + i).value;
        let correo = document.getElementById("correo" + i).value;
        let dpi = document.getElementById("dpi" + i).value;
        let peso = parseInt(document.getElementById("peso" + i).value);
        let idpaquete = await APItipoViaje(id_paquete);
        let precioPorUsuario = precioPaquete / cantidad;
        //console.log(peso);
        //console.log(typeof peso); 

        //let miID = Date.now().toString() + i + peso + dpi;
        //let idPasajero = miID;

        // Validar apellidos
        let regexApellidos = /^[A-Za-z\s]+$/;
        if (!regexApellidos.test(apellidos)) {
            showToast("Apellidos inválidos. Ingresa solo letras y espacios.");
            return; // Detener el proceso si los apellidos son inválidos
        }

        // Validar correo
        let regexCorreo = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
        if (!regexCorreo.test(correo)) {
            showToast("Correo inválido. Ingresa un correo válido.");
            return; // Detener el proceso si el correo es inválido
        }

        // Validar DPI
        let regexDPI = /^\d{13}$/;
        if (!regexDPI.test(dpi)) {
            showToast("DPI inválido. Ingresa un número de DPI válido de 13 dígitos.");
            return; // Detener el proceso si el DPI es inválido
        }

        // Validar fecha
        let regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!regexFecha.test(selectedDate)) {
            showToast("Fecha inválida. Ingresa una fecha en el formato correcto (YYYY-MM-DD).");
            return; // Detener el proceso si la fecha es inválida
        }

        // Validar hora  
        let regexHora = /^(?:[01]\d|2[0-4]):[0-5]\d:[0-5]\d$/;
        if (!regexHora.test(horaViaje)) {
            showToast("Hora inválida. Ingresa una hora en el formato correcto (HH:MM:SS).");
            return; // Detener el proceso si la hora es inválida
        }

        // Validar nombres
        let regexNombres = /^[A-Za-z\s]+$/;
        if (!regexNombres.test(nombres)) {
            showToast("Nombres inválidos. Ingresa solo letras y espacios.");
            return; // Detener el proceso si los nombres son inválidos
        }

        // Validar peso
        let regexPeso = /^(?:[2-9]\d|1[0-4]\d|150)$/;
        if (!regexPeso.test(peso)) {
            showToast("Peso inválido. Ingresa un peso válido entre 20 y 150.");
            return; // Detener el proceso si el peso es inválido
        }



        /*
        "paqueteId": {
                    "id_paquete": 1,
                    "nombre_paquete": "Paquete Royalty",
                    "tipo_vuelo": "Vuelo redondo",
                    "descripcion": "Un viaje de lujo a cualquier destino que elijas",
                    "numero_max_personas": 2,
                    "precio": 10000.0,
                    "estatus": true
                },
                "id_viaje": 1,
                "nombres": "Juan Angel",
                "apellidos": "Ordonez Guzman",
                "correo": "juan.angel.guzman@gmail.com",
                "hora": "11:30:00",
                "dpi": "1234567890123",
                "peso": 92.0,
                "fecha": "2023-07-20",
                "total": 500.0
        
        */
        let pasajero = {
            paqueteId: idpaquete,
            id_viaje: idviaje,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            hora: horaViaje,
            dpi: dpi,
            peso: peso+0.1,
            fecha: selectedDate,
            total: precioPorUsuario+0.1
        };

        pasajeros.push(pasajero);
    }

    //console.log(pasajeros); // Aquí puedes hacer lo que desees con el arreglo de JSONs

    console.log(JSON.stringify(pasajeros, null, 2)); // Aquí se muestra el JSON en crudo

    // Realizar la llamada fetch dinámica según el tipo de viaje seleccionado
    async function APItipoViaje(tipoViaje) {
        const TIMEOUT_DELAY = 5000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Tiempo de espera excedido. Por favor, inténtalo nuevamente."));
            }, TIMEOUT_DELAY);
        });

        const fetchPromise = fetch(`https://www.royaltyflightsgt.com/api/paquetes/${tipoViaje}`, {
            method: "GET"
        });

        try {
            const response = await Promise.race([timeoutPromise, fetchPromise]);
            if (response.ok) {
                const data = await response.json();
                return data; // Retornar los datos obtenidos del API
            } else {
                throw new Error("Error al obtener los datos del paquete. Por favor, inténtalo nuevamente.");
            }
        } catch (error) {
            console.error(error);
            // Lógica adicional para manejar el error de tiempo de espera u otros errores
            throw error;
        }
    }

    async function APIpaquetePrecio(tipoViaje) {
        const TIMEOUT_DELAY = 5000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Tiempo de espera excedido. Por favor, inténtalo nuevamente."));
            }, TIMEOUT_DELAY);
        });

        const fetchPromise = fetch(`https://www.royaltyflightsgt.com/api/paquetes/${tipoViaje}`, {
            method: "GET"
        });

        try {
            const response = await Promise.race([timeoutPromise, fetchPromise]);
            if (response.ok) {
                const data = await response.json();
                if (data.hasOwnProperty('precio')) {
                    const precio = data.precio;
                    return precio; // Retornar solo el valor del campo 'precio'
                } else {
                    throw new Error("El JSON obtenido no contiene el campo 'precio'.");
                }
            } else {
                throw new Error("Error al obtener los datos del paquete. Por favor, inténtalo nuevamente.");
            }
        } catch (error) {
            console.error(error);
            // Lógica adicional para manejar el error de tiempo de espera u otros errores
            throw error;
        }
    }

    //Llamada a la función para enviar los datos de los pasajeros
    try {
        await enviarDatosPasajeros(pasajeros);
        showToast("Datos enviados exitosamente.");
    } catch (error) {
        showToast("Error al enviar los datos. Por favor, inténtalo nuevamente.");
        console.error(error);
    } 

});

async function enviarDatosPasajeros(pasajeros) {
    const TIMEOUT_DELAY = 5000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Tiempo de espera excedido. Por favor, inténtalo nuevamente."));
        }, TIMEOUT_DELAY);
    });

    const fetchPromise = fetch("https://www.royaltyflightsgt.com/api/creacion-cita/sesion-pago", {
        method: "POST",
        mode: "no-cors", // Agregar el modo "no-cors" a la solicitud
        headers: {
            "Content-Type": "application/json", // Asegurarse de que el tipo de contenido sea JSON
        },
        body: JSON.stringify(pasajeros),
    });

    try {
        const response = await Promise.race([timeoutPromise, fetchPromise]);
        if (response.ok) {
            const data = await response.json();
            return data; // Puedes procesar la respuesta del servidor si es necesario
        } else {
            throw new Error("Error al enviar los datos de los pasajeros. Por favor, inténtalo nuevamente.");
        }
    } catch (error) {
        console.error(error);
        // Lógica adicional para manejar el error de tiempo de espera u otros errores
        throw error;
    }
}

function showToast(message) {
    // Implementa aquí la lógica para mostrar un mensaje de error o notificación al usuario
    console.log(message);
}


function showToast(message) {
    // Aquí debes implementar la lógica para mostrar un toast en tu interfaz de usuario
    // Puedes utilizar una biblioteca de toasts como 'Toastify', 'SweetAlert', 'Materialize', entre otras
    // O bien, implementar tu propio mecanismo para mostrar mensajes emergentes
    // El código a continuación es solo un ejemplo utilizando 'alert' para mostrar el mensaje
    alert(message);
}
/*  ------ */
