const URL = "http://localhost:3001/usuarios";

// GET
async function getUsuarios() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los productos", error);
    }
}

// POST
async function postProductos(producto) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear el producto", error);
    }
}

// DELETE
async function deleteProductos(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
}

// PUT
async function putProductos(id, producto) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar el producto", error);
    }
}

export { getProductos, postProductos, deleteProductos, putProductos };
