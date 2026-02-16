const URL = "http://localhost:3001/reportes";

// GET
async function getReportes() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los reportes", error);
    }
}

// POST
async function postReportes(reporte) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reporte)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el reporte", error);
    }
}

// DELETE
async function deleteReportes(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el reporte", error);
    }
}

// PUT
async function putReportes(id, reporte) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reporte)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el reporte", error);
    }
}

export { getReportes, postReportes, deleteReportes, putReportes };
