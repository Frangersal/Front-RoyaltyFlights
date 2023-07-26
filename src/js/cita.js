
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

let cantidadPasajeros = 1; // Variable para almacenar la cantidad de pasajeros actual
let pasajerosData = {}; // Objeto para almacenar los datos ingresados en los campos de cada pasajero

function mostrarInputs() {
    let inputsContainer = document.getElementById("inputs-container");

    // Guardar los datos de los campos de entrada del pasajero actual antes de actualizar los inputs
    if (cantidadPasajeros > 0) {
        for (let i = 1; i <= cantidadPasajeros; i++) {
            pasajerosData[i] = {
                nombre: document.getElementById("nombre" + i)?.value || '',
                apellido: document.getElementById("apellido" + i)?.value || '',
                correo: document.getElementById("correo" + i)?.value || '',
                dpi: document.getElementById("dpi" + i)?.value || '',
                peso: document.getElementById("peso" + i)?.value || '',
            };
        }
    }

    // Limpiar el contenedor antes de agregar los nuevos campos de entrada
    inputsContainer.innerHTML = '';

    // Agregar los campos de entrada para cada pasajero
    for (let i = 1; i <= cantidadPasajeros; i++) {
        let html = `
            <div class="row">
                <div class="form-group col-md-12">
                    <span>Pasajero ${i}</span>
                </div>
                <div class="form-group col-md-6">
                    <!--<label for="nombre${i}">Nombre:</label>-->
                    <input type="text" class="form-control" id="nombre${i}" placeholder="Ingresa nombre" required value="${pasajerosData[i]?.nombre || ''}">
                </div> 
                <div class="form-group col-md-6">
                    <!-- 
                    <label for="apellido${i}">Apellido:</label>-->
                    <input type="text" class="form-control" id="apellido${i}" placeholder="Ingresa apellido" required value="${pasajerosData[i]?.apellido || ''}">
                </div>
                <div class="form-group col-md-4">
                    <!--<label for="correo${i}">Correo:</label>-->
                    <input type="email" class="form-control" id="correo${i}" placeholder="Ingresa Email" required value="${pasajerosData[i]?.correo || ''}">
                </div> 
                <div class="form-group col-md-4">
                    <!--<label for="dpi${i}">DPI:</label>-->
                    <input type="text" class="form-control" id="dpi${i}" placeholder="Ingresa DPI" required value="${pasajerosData[i]?.dpi || ''}">
                </div>
                <div class="form-group col-md-4">
                    <!--<label for="peso${i}">Peso:</label>-->
                    <input type="text" class="form-control" id="peso${i}" placeholder="Ingresa peso en kilos" required value="${pasajerosData[i]?.peso || ''}">
                </div>
            </div>
        `;
        inputsContainer.innerHTML += html;
    }
}

let limitePasajeros = 1;
let pasajerosMostrados = 1;

async function APImxPersonas(tipoViaje) {
    const TIMEOUT_DELAY = 1000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

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
            if (data.hasOwnProperty('numero_max_personas')) {
                const numero_max_personas = data.numero_max_personas;
                return numero_max_personas; // Retornar solo el valor del campo 'numero_max_personas'
            } else {
                throw new Error("El JSON obtenido no contiene el campo 'numero_max_personas'.");
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
document.getElementById("tipoViaje").addEventListener("change", async function () {
    const tipoViajeValue = this.value;
    try {
        limitePasajeros = await APImxPersonas(tipoViajeValue);
        //console.log("Limite de pasajeros obtenido:", limitePasajeros);
    } catch (error) {
        console.error(error);
    }
});

// Bloquear o desbloquear el botón "Quitar pasajero" según la cantidad de pasajeros mostrados
const btnQuitarPasajero = document.querySelector(".btn-quitarPasajero");
if (pasajerosMostrados === 1) {
    btnQuitarPasajero.disabled = true;
} else {
    btnQuitarPasajero.disabled = false;
}

let contadorPasajerosResumen = 1;
   
function agregarPasajero() {
    if (cantidadPasajeros < limitePasajeros) {
        cantidadPasajeros++;
        contadorPasajerosResumen++
        mostrarInputs();
        pasajerosMostrados++;
        console.log(pasajerosMostrados);

        // Actualizar estado del botón "Quitar pasajero"
        const btnQuitarPasajero = document.querySelector(".btn-quitarPasajero");
        btnQuitarPasajero.disabled = pasajerosMostrados === 1;
    }
}

function quitarPasajero() {
    if (cantidadPasajeros > 1) {
        cantidadPasajeros--;
        contadorPasajerosResumen--
        mostrarInputs();
        pasajerosMostrados--;
        console.log(pasajerosMostrados);

        // Actualizar estado del botón "Quitar pasajero"
        const btnQuitarPasajero = document.querySelector(".btn-quitarPasajero");
        btnQuitarPasajero.disabled = pasajerosMostrados === 1;
    }
}


function cantidadPasajerosInputs() {
    return pasajerosMostrados;
}

// Llamar a la función mostrarInputs() inicialmente para mostrar los campos de entrada para 1 pasajero
mostrarInputs();

/*** */
document.querySelector(".btn-cita").addEventListener("click", async function () {
    let cantidad = cantidadPasajerosInputs();
    let id_paquete = parseInt(document.getElementById("tipoViaje").value);
    let selectedDate = document.getElementById("selected-date").value;
    let selectedHours = Array.from(document.querySelectorAll(".option-hora:checked")).map(option => option.value);

    let pasajeros = [];
    let idviaje = parseInt(Date.now().toString()); // Asignar un ID de viaje
    let idviajeComoCadena = idviaje.toString();
    let idviajeNueve = idviajeComoCadena.substring(0, 9);
    let numeroEntero = parseInt(idviajeNueve, 10);
    // Tipo paquete
    let regexPaquete = /^[1-3]$/;
    if (!regexPaquete.test(id_paquete)) {
        showToast("Selecciono paquete invalido. Seleccione en la seccion pasajeros.");
        return; // Detener el proceso si los apellidos son inválidos
    }
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

        let pasajero = {
            paqueteId: idpaquete,
            id_viaje: numeroEntero,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            hora: horaViaje,
            dpi: dpi,
            peso: peso,
            fecha: selectedDate,
            total: precioPorUsuario
        };

        pasajeros.push(pasajero);
    }

    //console.log(pasajeros); // Aquí puedes hacer lo que desees con el arreglo de JSONs

    console.log(JSON.stringify(pasajeros, null, 2)); // Aquí se muestra el JSON en crudo
    console.log(pasajeros);
    //let jsonPasajeros = JSON.stringify(pasajeros);

    function isJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    }

    //console.log(isJSON(jsonPasajeros));
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


    //Llamada a la función para enviar los datos de los pasajeros
    try {
        await enviarDatosPasajeros(pasajeros);
        showToast("Datos enviados exitosamente.");
    } catch (error) {
        showToast("Error al enviar los datos. Por favor, inténtalo nuevamente.");
        console.error(error);
    }

});

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
async function enviarDatosPasajeros(pasajeros) {
    const TIMEOUT_DELAY = 5000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Tiempo de espera excedido. Por favor, inténtalo nuevamente."));
        }, TIMEOUT_DELAY);
    });

    const fetchPromise = fetch("https://www.royaltyflightsgt.com/api/creacion-cita/sesion-pago", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pasajeros), // Convertir el arreglo en JSON
    });


    try {
        const response = await Promise.race([timeoutPromise, fetchPromise]);
        if (response.ok) {
            const data = await response.json();
            console.log("Respuesta del servidor:", data); // Mostrar la respuesta del servidor en la consola
            window.location.href = data.urlPago;
            //return data; // Puedes procesar la respuesta del servidor si es necesario
        } else {
            throw new Error("Error al enviar los datos de los pasajeros. Por favor, inténtalo nuevamente.");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
        throw error; // Re-lanzar el error para que el llamador también pueda manejarlo
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
/*  ----------  RESUMEN DE LA CITA -------------------*/

async function APIhtmlSubtotal(tipoViaje, numeroPasajeros) {
    const TIMEOUT_DELAY = 2000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

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
                const nombre_paquete = data.nombre_paquete;
                const precio = data.precio;
                let subtotal = precio / numeroPasajeros;
                let subtotalHtml = `Q${subtotal.toFixed(2)}`;
                return subtotalHtml; // Retornar solo el valor del campo 'precio'
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

async function APIhtmlTotal(tipoViaje) {
    const TIMEOUT_DELAY = 2000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

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
                let opciones = { style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 };
                let resultado = `Q${precio.toFixed(2).toLocaleString(undefined, opciones)}`;
                return resultado; // Retornar solo el valor del campo 'precio'
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
async function APIhtmlNombreTipoViaje(tipoViaje) {
    const TIMEOUT_DELAY = 2000; // Tiempo de espera en milisegundos (en este caso, 5 segundos)

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
                const nombre_paquete = data.nombre_paquete;
                let resultado = `${nombre_paquete}`;
                return resultado; // Retornar solo el valor del campo 'precio'
            } else {
                throw new Error("El JSON obtenido no contiene el campo 'nombre_paquete'.");
            }
        } else {
            throw new Error("Error al obtener los datos del paquete nombre_paquete. Por favor, inténtalo nuevamente.");
        }
    } catch (error) {
        console.error(error);
        // Lógica adicional para manejar el error de tiempo de espera u otros errores
        throw error;
    }
}
// Obtener el elemento con el ID "nav-resumen-tab"
const navResumenTab = document.getElementById('nav-resumen-tab');

// Función que se ejecutará cuando se haga clic en el elemento
function clicEnNavResumen() {
    console.log('¡Se hizo clic en "Resumen"!');
    // Aquí puedes agregar cualquier acción adicional que desees realizar.
}

// Agregar el listener de clic al elemento
navResumenTab.addEventListener('click', async function () {
    
 
    let id_paquete = parseInt(document.getElementById("tipoViaje").value);
    let selectedDate = document.getElementById("selected-date").value;
    let selectedHours = Array.from(document.querySelectorAll(".option-hora:checked")).map(option => option.value);
    let precioPaquete = await APIpaquetePrecio(id_paquete);

    clicEnNavResumen();
    

    //Generar tipo de viaje 
    let ticketTipoViaje = document.getElementById('ticket-tipo-viaje');
    ticketTipoViaje.textContent = await APIhtmlNombreTipoViaje(id_paquete);

    // Generar nombres 
    function guardarDatosSiExiste(inputId) {
        let inputElement = document.getElementById(inputId);
        if (inputElement) { 
            return inputElement.value;
        } 
        return null;

    }

    let nombre1 = guardarDatosSiExiste('nombre1');
    let nombre2 = guardarDatosSiExiste('nombre2');
    let nombre3 = guardarDatosSiExiste('nombre3');
    let nombre4 = guardarDatosSiExiste('nombre4');

    let ticketNombre1 = document.getElementById('ticket-nombre1');
    let ticketNombre2 = document.getElementById('ticket-nombre2');
    let ticketNombre3 = document.getElementById('ticket-nombre3');
    let ticketNombre4 = document.getElementById('ticket-nombre4');

    ticketNombre1.textContent = nombre1;
    ticketNombre2.textContent = nombre2;
    ticketNombre3.textContent = nombre3;
    ticketNombre4.textContent = nombre4;



    // Generar Subtotal
    const vacio  = '';
    let ticketSubtotal1 = document.getElementById('ticket-subtotal1');
    let ticketSubtotal2 = document.getElementById('ticket-subtotal2');
    let ticketSubtotal3 = document.getElementById('ticket-subtotal3');
    let ticketSubtotal4 = document.getElementById('ticket-subtotal4');

    ticketSubtotal1.textContent = vacio;
    ticketSubtotal2.textContent = vacio;
    ticketSubtotal3.textContent = vacio;
    ticketSubtotal4.textContent = vacio;

    try {
        let calcularSubtotal = await APIhtmlSubtotal(id_paquete, contadorPasajerosResumen);

        // Recorremos el array de subtotales y los mostramos en los elementos HTML correspondientes
        for (let i = 1; i <= contadorPasajerosResumen; i++) {
            let subtotal = calcularSubtotal;
            let ticketSubtotalElement = document.getElementById(`ticket-subtotal${i}`);
            ticketSubtotalElement.textContent = '';
            ticketSubtotalElement.textContent = subtotal;
            
            console.log("contadorPasajerosResumen -"+contadorPasajerosResumen)
            console.log("subtotal i-"+i)
        }
    } catch (error) {
        console.error("Error al obtener los subtotales:", error);
    }


    //Generar Total
    let ticketTotal = document.getElementById('ticket-total');
    ticketTotal.textContent = await APIhtmlTotal(id_paquete);

    // Generar Fecha
    let fechaSeleccionada = document.getElementById("selected-date").value;
    let ticketFecha = document.getElementById('ticket-fecha');
    ticketFecha.textContent = fechaSeleccionada;
    // Generar Hora 
    let horaSeleccionada = Array.from(document.querySelectorAll(".option-hora:checked")).map(option => option.value);

    let ticketHora = document.getElementById('ticket-hora');
    ticketHora.textContent = horaSeleccionada;
    // Mostrar los valores en la consola (puedes hacer lo que desees con ellos)
    console.log('Nombre 1:', nombre1);
    console.log('Nombre 2:', nombre2);
    console.log('Nombre 3:', nombre3);
    console.log('Nombre 4:', nombre4);
});
