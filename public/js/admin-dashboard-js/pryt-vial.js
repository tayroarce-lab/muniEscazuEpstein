import { getViales, postViales, deleteViales, patchViales } from "../../server/serviceViales.js";

const btnAgregarVial = document.getElementById("botonAgregarVial");

const nombreVial = document.getElementById("nombreVial");
const ubicacionVial = document.getElementById("ubicacionVial");
const fotoVial = document.getElementById("fotoVial");
const descripcionVial = document.getElementById("descripcionVial");

const listaGestion = document.querySelector(".tabla-gestion");
const contenedorPublico = document.getElementById("contenedor-para-js");

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    renderizarViales();
});

btnAgregarVial.addEventListener("click", async function() {
    // Validar campos
    if (!nombreVial.value || !descripcionVial.value) {
         Swal.fire("Campos incompletos", "Por favor rellene nombre y descripción", "warning");
         return;
    }

    const vial = {
        nombre: nombreVial.value,
        ubicacion: ubicacionVial.value,
        foto: fotoVial.value,
        descripcion: descripcionVial.value,
        estado: "Pendiente" // Valor por defecto
    };

    try {
        await postViales(vial);
        
        // SweetAlert de éxito
        Swal.fire({
            title: "Excelente",
            text: "Proyecto creado con éxito",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        // Limpiar inputs
        nombreVial.value = "";
        ubicacionVial.value = "";
        fotoVial.value = "";
        descripcionVial.value = "";

        // Volver a pintar
        renderizarViales();

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo crear el proyecto", "error");
    }
});


async function renderizarViales() {
    try {
        const viales = await getViales();
        
        // 1. Renderizar en la lista de gestión (Admin)
        if (listaGestion) {
            listaGestion.innerHTML = ""; // Limpiar hardcoded/previos
            
            viales.forEach(vial => {
                const item = document.createElement("div");
                item.className = "fila-gestion";

                item.innerHTML = `
                    <div style="flex: 1;">
                        <span class="nombre-obra" style="font-weight: bold;">${vial.nombre}</span>
                        <br>
                        <small>${vial.ubicacion || 'Sin ubicación'}</small>
                    </div>
                    <div class="botones-gestion">
                        <button class="boton-accion azul btn-editar">Editar</button>
                        <button class="boton-accion rojo btn-eliminar">Borrar</button>
                    </div>
                `;

                // Botón Borrar
                item.querySelector(".btn-eliminar").addEventListener("click", () => {
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "Se eliminará este proyecto permanentemente",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Sí, borrar",
                        cancelButtonText: "Cancelar"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await deleteViales(vial.id);
                            Swal.fire("Eliminado", "", "success");
                            renderizarViales();
                        }
                    });
                });

                // Botón Editar
                item.querySelector(".btn-editar").addEventListener("click", () => {
                    Swal.fire({
                        title: "Editar Proyecto",
                        html: `
                            <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${vial.nombre}">
                            <input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación" value="${vial.ubicacion || ''}">
                            <input id="swal-foto" class="swal2-input" placeholder="Foto URL" value="${vial.foto || ''}">
                            <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción">${vial.descripcion || ''}</textarea>
                        `,
                        showCancelButton: true,
                        confirmButtonText: "Guardar"
                    }).then(async (res) => {
                        if (res.isConfirmed) {
                             const updatedData = {
                                nombre: document.getElementById("swal-nombre").value,
                                ubicacion: document.getElementById("swal-ubicacion").value,
                                foto: document.getElementById("swal-foto").value,
                                descripcion: document.getElementById("swal-desc").value
                            };
                            await patchViales(vial.id, updatedData);
                            Swal.fire("Actualizado", "", "success");
                            renderizarViales();
                        }
                    });
                });

                listaGestion.appendChild(item);
            });
        }

        // 2. Renderizar en la sección pública (Cards)
        if (contenedorPublico) {
            contenedorPublico.innerHTML = "";
            
            if (viales.length === 0) {
                contenedorPublico.innerHTML = "<p>No hay proyectos registrados actualmente.</p>";
            } else {
                viales.forEach(vial => {
                    const card = document.createElement("article");
                    card.className = "tarjeta-pequena";

                    const imgUrl = vial.foto || "../../img/calle nueva.jpg"; // Fallback image

                    card.innerHTML = `
                        <div class="espacio-foto">
                            <img src="${imgUrl}" alt="${vial.nombre}">
                        </div>
                        <h3>${vial.nombre}</h3>
                        <p>${vial.descripcion}</p>
                        <p class="meta-info">
                            <small><strong>Ubicación:</strong> ${vial.ubicacion || "N/A"}</small>
                            <br>
                            <span class="etiqueta-estado">${vial.estado || "En proceso"}</span>
                        </p>
                    `;
                    contenedorPublico.appendChild(card);
                });
            }
        }

    } catch (error) {
        console.error("Error al renderizar", error);
    }
}
