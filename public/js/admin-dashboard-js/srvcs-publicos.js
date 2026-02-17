import { getServiciosPublicos } from "../../server/serviceServicios.js";

const contenedor = document.getElementById("contenedor");

renderizarServiciosPublicos();
async function renderizarServiciosPublicos() {
    const servicios = await getServiciosPublicos();
    console.log("serviciosPublicos", servicios);

    contenedor.innerHTML = "";
    servicios.forEach(servicio => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${servicio.id}</h3>
            <h3>${servicio.nombre}</h3>
            <h3>${servicio.descripcion}</h3>
            <h3>${servicio.estado}</h3>
            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}