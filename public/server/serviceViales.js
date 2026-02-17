const URL = "http://localhost:3001/proyectosViales";

// GET
async function getViales() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los viales", error);
    }
}

// POST
async function postViales(vial) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vial)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el vial", error);
    }
}

// DELETE
async function deleteViales(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el vial", error);
    }
}

// PUT
async function patchViales(id, vial) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vial)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el vial", error);
    }
}

export { getViales, postViales, deleteViales, patchViales };
