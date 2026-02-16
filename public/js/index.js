// ===============================
// REFERENCIAS DEL DOM
// ===============================

const btnEnviar = document.getElementById("btnEnviar");
const selectTipoProblema = document.getElementById("tipoProblema");
const inputEspecificacion = document.getElementById("EspecifiqueProblema");
const inputUbicacion = document.getElementById("ubicacion");
const formulario = document.getElementById("formReporte");

btnEnviar.addEventListener("click", manejarEnvio);


// ===============================
// FUNCIÓN PRINCIPAL
// ===============================

function manejarEnvio() {

    const tipoProblema = selectTipoProblema.value.trim();
    const especificacion = inputEspecificacion.value.trim();
    const ubicacion = inputUbicacion.value.trim();

    if (!validarCampos(tipoProblema, especificacion, ubicacion)) {
        return;
    }

    const nuevoReporte = construirObjetoReporte(tipoProblema, especificacion, ubicacion);

    enviarReporte(nuevoReporte);
}


// ===============================
// VALIDACIÓN
// ===============================

function validarCampos(tipoProblema, especificacion, ubicacion) {

    if (!tipoProblema || !especificacion || !ubicacion) {

        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Debe completar todos los campos"
        });

        return false;
    }

    return true;
}


// ===============================
// CONSTRUIR OBJETO
// ===============================

function construirObjetoReporte(tipoProblema, especificacion, ubicacion) {

    return {
        tipoProblema: tipoProblema,
        detalle: especificacion,
        ubicacion: ubicacion,
        fecha: new Date().toISOString()
    };
}


// ===============================
// PETICIÓN POST A JSON SERVER
// ===============================

function enviarReporte(reporte) {

    fetch("http://localhost:3001/reportes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(reporte)

    })
    .then(respuesta => respuesta.json())
    .then(data => {

        Swal.fire({
            icon: "success",
            title: "Reporte registrado",
            text: "El problema fue guardado correctamente"
        });

        formulario.reset();
        console.log("Reporte guardado:", data);

    })
    .catch(error => {

        console.error("Error al guardar:", error);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo conectar con el servidor"
        });

    });
}
