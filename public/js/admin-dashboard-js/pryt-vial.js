import { getViales, postViales, deleteViales, patchViales } from "../../server/serviceViales.js";

const btnAgregarVial = document.getElementById("botonAgregarVial");

const nombreVial = document.getElementById("nombreVial");
const ubicacionVial = document.getElementById("ubicacionVial");
const fotoVial = document.getElementById("fotoVial");
const descripcionVial = document.getElementById("descripcionVial");


btnAgregarVial.addEventListener("click", async function() {
    const vial = {
        nombre: nombreVial.value,
        ubicacion: ubicacionVial.value,
        foto: fotoVial.value,
        descripcion: descripcionVial.value
    };
    await postViales(vial);
    renderizarViales();
});


async function renderizarViales() {
    const viales = await getViales();
    console.log(viales);
    const tbody = document.getElementById("tbodyViales");
    tbody.innerHTML = "";

    viales.forEach(vial => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${vial.id}</td>
            <td>${vial.nombre}</td>
            <td>${vial.descripcion}</td>
            <td>${vial.estado || "Sin estado"}</td>
            <td>
                <button class="btn-editar">Actualizar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
        `;

        // Eliminar con SweetAlert
        tr.querySelector(".btn-eliminar").addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Este proyecto vial se eliminará permanentemente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteViales(vial.id);
                    Swal.fire("Eliminado", "El proyecto fue eliminado correctamente", "success");
                    renderizarViales();
                }
            });
        });

        // Actualizar con SweetAlert
        tr.querySelector(".btn-editar").addEventListener("click", () => {
            Swal.fire({
                title: "Actualizar Proyecto Vial",
                html: `
                    <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${vial.nombre || ""}">
                    <input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación" value="${vial.ubicacion || ""}">
                    <input id="swal-foto" class="swal2-input" placeholder="URL de foto" value="${vial.foto || ""}">
                    <textarea id="swal-descripcion" class="swal2-textarea" placeholder="Descripción">${vial.descripcion || ""}</textarea>
                    <select id="swal-estado" class="swal2-select">
                        <option value="Pendiente" ${vial.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="En progreso" ${vial.estado === "En progreso" ? "selected" : ""}>En progreso</option>
                        <option value="Completado" ${vial.estado === "Completado" ? "selected" : ""}>Completado</option>
                    </select>
                `,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                showCancelButton: true,
                preConfirm: () => {
                    return {
                        nombre: document.getElementById("swal-nombre").value,
                        ubicacion: document.getElementById("swal-ubicacion").value,
                        foto: document.getElementById("swal-foto").value,
                        descripcion: document.getElementById("swal-descripcion").value,
                        estado: document.getElementById("swal-estado").value
                    };
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await patchViales(vial.id, result.value);
                    Swal.fire("Actualizado", "El proyecto fue editado correctamente", "success");
                    renderizarViales();
                }
            });
        });

        tbody.appendChild(tr);
    });
}

renderizarViales();
