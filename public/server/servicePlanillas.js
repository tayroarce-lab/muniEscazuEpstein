const URL = "http://localhost:3001/planillas";

// GET
async function getPlanillas() {
    try {
        const respuestaServidor = await fetch(URL);
        return await respuestaServidor.json();
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

// POST
async function postPlanillas(planilla) {
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(planilla)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al crear la planilla", error);
    }
}

// DELETE
async function deletePlanillas(id) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar la planilla", error);
    }
}

// PUT
async function putPlanillas(id, planilla) {
    try {
        const respuesta = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(planilla)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar la planilla", error);
    }
}

export { getPlanillas, postPlanillas, deletePlanillas, putPlanillas };
