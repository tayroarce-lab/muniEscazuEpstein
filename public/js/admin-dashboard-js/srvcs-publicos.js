import { getServiciosPublicos, postServiciosPublicos, deleteServiciosPublicos, putServiciosPublicos } from "../../server/serviceServicios.js";

const contenedor = document.getElementById("contenedor");
const formulario = document.getElementById("formulario-servicio");
const tituloInput = document.getElementById("titulo-servicio");
const descripcionInput = document.getElementById("descripcion-servicio");
const btnPublicar = document.querySelector(".boton-enviar");

// Renderizar al cargar
renderizarServiciosPublicos();

async function renderizarServiciosPublicos() {
    try {
        const servicios = await getServiciosPublicos(); // Devuelve array
        contenedor.innerHTML = "";

        if (!servicios) return;

        servicios.forEach(servicio => {
            // Estructura de tarjeta
            const div = document.createElement("div");
            div.className = "tarjeta-servicio"; // Agregar clase si existe CSS para tarjeta
            div.style.border = "1px solid #ddd"; // Estilo basico por si acaso
            div.style.padding = "15px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "8px";
            div.style.backgroundColor = "#fff";

            div.innerHTML = `
                <h3 style="color: #0056b3;">${servicio.nombre}</h3>
                <p><strong>ID:</strong> ${servicio.id}</p>
                <p><strong>Descripción:</strong> ${servicio.descripcion}</p>
                <p><strong>Estado:</strong> <span class="estado-${servicio.estado?.toLowerCase() || 'bueno'}">${servicio.estado || "Bueno"}</span></p>
                <div class="acciones">
                    <button class="btn-editar" style="background-color: #ffc107; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Editar</button>
                    <button class="btn-eliminar" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button>
                </div>
            `;

            // Botón Eliminar
            const btnEliminar = div.querySelector(".btn-eliminar");
            btnEliminar.addEventListener("click", () => {
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Este servicio será eliminado permanentemente",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await deleteServiciosPublicos(servicio.id);
                            Swal.fire("Eliminado", "El servicio ha sido eliminado.", "success");
                            renderizarServiciosPublicos();
                        } catch (error) {
                            Swal.fire("Error", "No se pudo eliminar el servicio", "error");
                        }
                    }
                });
            });

            // Botón Editar
            const btnEditar = div.querySelector(".btn-editar");
            btnEditar.addEventListener("click", () => {
                Swal.fire({
                    title: "Editar Servicio",
                    html: `
                        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${servicio.nombre}">
                        <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción">${servicio.descripcion}</textarea>
                        <select id="swal-estado" class="swal2-select">
                            <option value="Bueno" ${servicio.estado === "Bueno" ? "selected" : ""}>Bueno</option>
                            <option value="En Mantenimiento" ${servicio.estado === "En Mantenimiento" ? "selected" : ""}>En Mantenimiento</option>
                            <option value="Fuera de Servicio" ${servicio.estado === "Fuera de Servicio" ? "selected" : ""}>Fuera de Servicio</option>
                        </select>
                    `,
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                    preConfirm: () => {
                        return {
                            nombre: document.getElementById("swal-nombre").value,
                            descripcion: document.getElementById("swal-descripcion").value,
                            estado: document.getElementById("swal-estado").value
                        };
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await putServiciosPublicos(servicio.id, result.value);
                            Swal.fire("Actualizado", "El servicio ha sido actualizado.", "success");
                            renderizarServiciosPublicos();
                        } catch (error) {
                            Swal.fire("Error", "No se pudo actualizar el servicio", "error");
                        }
                    }
                });
            });

            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al renderizar servicios:", error);
    }
}

// Publicar Nuevo Servicio
if (btnPublicar) {
    btnPublicar.addEventListener("click", async () => {
        const nombre = tituloInput.value.trim();
        const descripcion = descripcionInput.value.trim();

        if (!nombre || !descripcion) {
            Swal.fire("Campos vacíos", "Por favor, complete todos los campos.", "warning");
            return;
        }

        const nuevoServicio = {
            nombre: nombre,
            descripcion: descripcion,
            estado: "Bueno" // Estado por defecto
        };

        try {
            await postServiciosPublicos(nuevoServicio);
            Swal.fire("Publicado", "El servicio ha sido agregado exitosamente.", "success");
            formulario.reset();
            renderizarServiciosPublicos();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo publicar el servicio.", "error");
        }
    });
}