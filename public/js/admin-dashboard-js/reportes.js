import { getReportes, deleteReportes, putReportes } from "../../server/serviceReports.js";

const contenedor = document.getElementById("tablaReportes");

async function renderizarReportes() {
    const reportes = await getReportes();
    console.log("reportes", reportes);

    contenedor.innerHTML = "";
    reportes.forEach(reporte => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${reporte.id}</td>
            <td>${reporte.tipo}</td>
            <td>${reporte.descripcion}</td>
            <td>${reporte.ubicacion}</td>
            <td>${reporte.estado}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </td>
        `;

        tr.querySelector(".btn-eliminar").addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Este reporte se eliminará permanentemente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteReportes(reporte.id);
                    Swal.fire("Eliminado", "El reporte fue eliminado correctamente", "success");
                    renderizarReportes();
                }
            });
        });

        tr.querySelector(".btn-editar").addEventListener("click", () => {
            Swal.fire({
                title: "Editar Reporte",
                html: `
                    <input id="swal-tipo" class="swal2-input" placeholder="Tipo" value="${reporte.tipo}">
                    <input id="swal-descripcion" class="swal2-input" placeholder="Descripción" value="${reporte.descripcion}">
                    <input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación" value="${reporte.ubicacion}">
                    <select id="swal-estado" class="swal2-select">
                        <option value="Pendiente" ${reporte.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="En proceso" ${reporte.estado === "En proceso" ? "selected" : ""}>En proceso</option>
                        <option value="Resuelto" ${reporte.estado === "Resuelto" ? "selected" : ""}>Resuelto</option>
                    </select>
                `,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                showCancelButton: true,
                preConfirm: () => {
                    return {
                        tipo: document.getElementById("swal-tipo").value,
                        descripcion: document.getElementById("swal-descripcion").value,
                        ubicacion: document.getElementById("swal-ubicacion").value,
                        estado: document.getElementById("swal-estado").value
                    };
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await putReportes(reporte.id, result.value);
                    Swal.fire("Actualizado", "El reporte fue editado correctamente", "success");
                    renderizarReportes();
                }
            });
        });

        contenedor.appendChild(tr);
    });
}

renderizarReportes();
