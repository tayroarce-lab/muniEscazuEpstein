

import { postPlanillas, deletePlanillas, putPlanillas } from "../server/servicePlanillas.js";
let planillas = JSON.parse(localStorage.getItem("planillas")) || [];

const form = document.getElementById("formPlanilla");
const tabla = document.getElementById("tablaPlanillas");
const editIndex = document.getElementById("editIndex");

function calcularNeto(base, extra, rebajos) {
    return base + extra - rebajos;
}

function renderTabla() {
    tabla.innerHTML = ""; // Limpiamos la tabla antes de renderizar
    planillas.forEach((p, i) => {
        const tr = document.createElement("tr");

        const tdEmpleado = document.createElement("td");
        tdEmpleado.textContent = p.empleo;
        tr.appendChild(tdEmpleado);

        const tdPuesto = document.createElement("td");
        tdPuesto.textContent = p.puesto;
        tr.appendChild(tdPuesto);

        const tdDepartamento = document.createElement("td");
        tdDepartamento.textContent = p.departamento;
        tr.appendChild(tdDepartamento);

        const tdSalarioBase = document.createElement("td");
        tdSalarioBase.textContent = `₡${p.salarioBase}`;
        tr.appendChild(tdSalarioBase);

        const tdHorasExtra = document.createElement("td");
        tdHorasExtra.textContent = `₡${p.horasExtra}`;
        tr.appendChild(tdHorasExtra);

        const tdRebajos = document.createElement("td");
        tdRebajos.textContent = `₡${p.rebajos}`;
        tr.appendChild(tdRebajos);

        const tdSalarioNeto = document.createElement("td");
        const bSalarioNeto = document.createElement("b");
        bSalarioNeto.textContent = `₡${p.salarioNeto}`;
        tdSalarioNeto.appendChild(bSalarioNeto);
        tr.appendChild(tdSalarioNeto);

        const tdAcciones = document.createElement("td");

        const btnUpdate = document.createElement("button");
        btnUpdate.className = "btn-update";
        btnUpdate.textContent = "Editar";
        btnUpdate.addEventListener("click", () => editPlanilla(i));
        tdAcciones.appendChild(btnUpdate);

        const btnDelete = document.createElement("button");
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", () => deletePlanilla(i));
        tdAcciones.appendChild(btnDelete);

        tr.appendChild(tdAcciones);
        tabla.appendChild(tr);
    });
    localStorage.setItem("planillas", JSON.stringify(planillas));
}

form.addEventListener("button", e => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        puesto: document.getElementById("puesto").value,
        departamento: document.getElementById("departamento").value,
        salarioBase: Number(document.getElementById("salarioBase").value),
        horasExtra: Number(document.getElementById("horasExtra").value),
        rebajos: Number(document.getElementById("rebajos").value)
    };

    data.salarioNeto = calcularNeto(data.salarioBase, data.horasExtra, data.rebajos);

    if (editIndex.value === "") {
        postPlanillas(data);
    } else {
        putPlanillas(editIndex.value, data);
        editIndex.value = "";
    }

    form.reset();
    renderTabla();
});

function editPlanilla(i) {
    const p = planillas[i];
    document.getElementById("nombre").value = p.empleo;
    document.getElementById("puesto").value = p.puesto;
    document.getElementById("departamento").value = p.departamento;
    document.getElementById("salarioBase").value = p.salarioBase;
    document.getElementById("horasExtra").value = p.horasExtra;
    document.getElementById("rebajos").value = p.rebajos;
    editIndex.value = i;
}

function deletePlanilla(i) {
    if (confirm("¿Desea eliminar este registro?")) {
        deletePlanillas(i);
        renderTabla();
    }
}

renderTabla();


