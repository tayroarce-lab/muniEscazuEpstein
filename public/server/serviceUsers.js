const URL = "http://localhost:3001/usuarios";

// GET
async function getUsuarios() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

// POST
async function postUsuarios(usuario) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el usuario", error);
    }
}

// DELETE
async function deleteUsuarios(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
    }
}

// PUT
async function putUsuarios(id, usuario) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}

export { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios };
