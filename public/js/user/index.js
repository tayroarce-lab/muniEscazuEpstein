import { getViales } from "../../server/serviceViales.js";
import { getServiciosPublicos } from "../../server/serviceServicios.js";

// REFERENCIAS DEL DOM
const botonEnviarReporte = document.getElementById("botonEnviarReporte");
const selectTipoProblema = document.getElementById("tipoProblema");
const inputUbicacion = document.getElementById("ubicacion");
const formularioReporte = document.getElementById("formularioReporte");

const listaObras = document.getElementById("lista-obras");
const contenedorServicios = document.getElementById("contenedor-servicios");
const botonCerrarSesion = document.getElementById("botonCerrarSesion");

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    verificarSesion();
    cargarDatosDashboard();
    initRevealOnScroll();
});

botonEnviarReporte.addEventListener("click", manejarEnvio);

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("user");
        window.location.href = "login.html";
    });
}

function verificarSesion() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
    }
}

async function cargarDatosDashboard() {
    await Promise.all([
        renderizarProyectosViales(),
        renderizarServiciosPublicos()
    ]);
}

// ===============================
//  RENDERING Dinámico
// ===============================

async function renderizarProyectosViales() {
    try {
        const viales = await getViales();
        if (!listaObras) return;

        listaObras.innerHTML = "";

        if (!viales || viales.length === 0) {
            listaObras.innerHTML = "<p class='cargando-datos'>No hay proyectos registrados actualmente.</p>";
            return;
        }

        viales.forEach(vial => {
            const card = document.createElement("article");
            card.className = "tarjeta-dinamica aparecer";

            card.innerHTML = `
                <div class="cuerpo-tarjeta">
                    <h4>${vial.nombre}</h4>
                    <p>${vial.descripcion}</p>
                </div>
                <div class="pie-tarjeta">
                    <small class="ubicacion-texto">📍 ${vial.ubicacion || "Cantón Escazú"}</small>
                    <span class="etiqueta-estado estado-${(vial.estado || 'Pendiente').toLowerCase().replace(/\s+/g, '-')}">
                        ${vial.estado || "Vía Pública"}
                    </span>
                </div>
            `;
            listaObras.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar viales:", error);
        listaObras.innerHTML = "<p class='error'>Error al cargar la información.</p>";
    }
}

async function renderizarServiciosPublicos() {
    try {
        const servicios = await getServiciosPublicos();
        if (!contenedorServicios) return;

        contenedorServicios.innerHTML = "";

        if (!servicios || servicios.length === 0) {
            contenedorServicios.innerHTML = "<p class='cargando-datos'>No hay servicios disponibles en este momento.</p>";
            return;
        }

        servicios.forEach(serv => {
            const card = document.createElement("div");
            card.className = "tarjeta-dinamica aparecer";

            card.innerHTML = `
                <div class="cuerpo-tarjeta">
                    <h4>${serv.nombre}</h4>
                    <p>${serv.descripcion}</p>
                </div>
                <div class="pie-tarjeta">
                    <span class="etiqueta-estado estado-${(serv.estado || 'Bueno').toLowerCase().replace(/\s+/g, '-')}">
                        ${serv.estado || "Operativo"}
                    </span>
                </div>
            `;
            contenedorServicios.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar servicios:", error);
        contenedorServicios.innerHTML = "<p class='error'>Error al cargar la información.</p>";
    }
}

// ===============================
// ANIMACIÓN (Opcional si se quiere mas control)
// ===============================
function initRevealOnScroll() {
    // Las animaciones por defecto ya están en el CSS con .aparecer
    // Podríamos añadir una clase dinámicamente si quisiéramos retrasos.
}

// ===============================
//  FUNCIÓN PRINCIPAL REPORTES
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

function construirObjetoReporte(tipoProblema, ubicacion) {
    return {
        tipoProblema: tipoProblema,
        ubicacion: ubicacion,
        fecha: new Date().toISOString()
    };
}

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
            formularioReporte.reset();
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
