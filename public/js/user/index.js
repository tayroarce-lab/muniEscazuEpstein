// REFERENCIAS DEL DOM

const btnEnviar = document.getElementById("btnEnviar");
const selectTipoProblema = document.getElementById("tipoProblema");
const inputUbicacion = document.getElementById("ubicacion");
const formulario = document.getElementById("formReporte");

btnEnviar.addEventListener("click", manejarEnvio);


// ===============================
//  FUNCIÓN PRINCIPAL
// ===============================

function manejarEnvio() {

    const tipoProblema = selectTipoProblema.value.trim();
    const ubicacion = inputUbicacion.value.trim();

    if (!validarCampos(tipoProblema, ubicacion)) {
        return;
    }

    const nuevoReporte = construirObjetoReporte(tipoProblema, ubicacion);

    enviarReporte(nuevoReporte);
}


// ===============================
// VALIDACIÓN
// ===============================

function validarCampos(tipoProblema, ubicacion) {

    if (!tipoProblema || !ubicacion) {

        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Debe seleccionar un problema y escribir la ubicación"
        });

        return false;
    }

    return true;
}


// ===============================
//  CONSTRUIR OBJETO
// ===============================

function construirObjetoReporte(tipoProblema, ubicacion) {

    return {
        tipoProblema: tipoProblema,
        ubicacion: ubicacion,
        fecha: new Date().toISOString()
    };
}


// ===============================
//  PETICIÓN POST A JSON SERVER
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