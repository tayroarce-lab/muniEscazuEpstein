const URL = "http://localhost:3001/serviciosPublicos";

// GET
async function getServiciosPublicos() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los servicios", error);
    }
}

// POST
async function postServiciosPublicos(servicio) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicio)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el servicio", error);
    }
}

// DELETE
async function deleteServiciosPublicos(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el servicio", error);
    }
}

// PUT
async function putServiciosPublicos(id, servicio) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicio)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el servicio", error);
    }
}

export { getServiciosPublicos, postServiciosPublicos, deleteServiciosPublicos, putServiciosPublicos };
