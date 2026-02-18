import { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios } from "../../server/serviceUsers.js";

const btnAnadir = document.getElementById("btnAnadir");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const rol = document.getElementById("rol");
const password = document.getElementById("password");
const usuariosRegistrados = document.getElementById("usuariosRegistrados");
const adminsRegistrados = document.getElementById("adminsRegistrados");

btnAnadir.addEventListener("click", async () => {
    const usuario = {
        nombre: nombre.value,
        email: email.value,
        rol: rol.value,
        password: password.value
    };
    await postUsuarios(usuario);
    nombre.value = "";
    email.value = "";
    rol.value = "";
    password.value = "";
    await renderizarAdmins();
});

async function renderizarAdmins() {
    const usuarios = await getUsuarios();
    const admins = usuarios.filter(usuario => usuario.rol === "admin");
    adminsRegistrados.innerHTML = "";
    admins.forEach(usuario => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>Nombre: ${usuario.nombre}</p>
            <p>Email: ${usuario.email}</p>
            <p>Password: ${usuario.password}</p>
            <p>Rol: ${usuario.rol}</p>
            <button id="btn-eliminar">Eliminar</button>
            <button id="btn-editar">Actualizar</button>
        `;

        // Botón Borrar
                div.querySelector("#btn-eliminar").addEventListener("click", function() {
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "Se eliminará este proyecto permanentemente",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Sí, borrar",
                        cancelButtonText: "Cancelar"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await deleteUsuarios(usuario.id);
                            Swal.fire("Eliminado", "", "success");
                            renderizarAdmins();
                        }
                    });
                });

                // Botón Editar
                div.querySelector("#btn-editar").addEventListener("click", function() {
                    Swal.fire({
                        title: "Editar Proyecto",
                        html: `
                            <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${usuario.nombre}">
                            <input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación" value="${usuario.email || ''}">
                            <input id="swal-foto" class="swal2-input" placeholder="Foto URL" value="${usuario.password || ''}">
                            <input id="swal-desc" class="swal2-textarea" placeholder="Descripción" value="${usuario.rol || ''}">
                        `,
                        showCancelButton: true,
                        confirmButtonText: "Guardar"
                    }).then(async (res) => {
                        if (res.isConfirmed) {
                            const updatedData = {
                                nombre: document.getElementById("swal-nombre").value,
                                email: document.getElementById("swal-ubicacion").value,
                                password: document.getElementById("swal-foto").value,
                                rol: document.getElementById("swal-desc").value
                            };
                            await putUsuarios(usuario.id, updatedData);
                            Swal.fire("Actualizado", "", "success");
                            renderizarAdmins();
                        }
                    });
                });

        adminsRegistrados.appendChild(div);
    });
}

async function renderizarUsuarios() {
    const usuariosComunes = await getUsuarios();
    const usuarios = usuariosComunes.filter(usuario => usuario.rol !== "admin");
    usuariosRegistrados.innerHTML = "";
    usuarios.forEach(usuario => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>Nombre: ${usuario.nombre}</p>
            <p>Email: ${usuario.email}</p>
            <p>Password: ${usuario.password}</p>
            <p>Rol: ${usuario.rol}</p>
            <button id="btnEliminar">Eliminar</button>
            <button id="btnEditar">Actualizar</button>
        `;

        // Botón Borrar
                div.querySelector("#btnEliminar").addEventListener("click", function() {
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "Se eliminará este proyecto permanentemente",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Sí, borrar",
                        cancelButtonText: "Cancelar"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await deleteUsuarios(usuario.id);
                            Swal.fire("Eliminado", "", "success");
                            renderizarUsuarios();
                        }
                    });
                });

                // Botón Editar
                div.querySelector("#btnEditar").addEventListener("click", function() {
                    Swal.fire({
                        title: "Editar Usuario",
                        html: `
                            <input id="swal-nombre" class="swal2-input" type="text" placeholder="Nombre" value="${usuario.nombre}">
                            <input id="swal-ubicacion" class="swal2-input" type="email" placeholder="Email" value="${usuario.email || ''}">
                            <input id="swal-foto" class="swal2-input" type="password" placeholder="Password" value="${usuario.password || ''}">
                            <input id="swal-desc" class="swal2-input" type="text" placeholder="Rol" value="${usuario.rol || ''}">
                        `,
                        showCancelButton: true,
                        confirmButtonText: "Actualizar"
                    }).then(async (res) => {
                        if (res.isConfirmed) {
                            const updatedData = {
                                nombre: document.getElementById("swal-nombre").value,
                                email: document.getElementById("swal-ubicacion").value,
                                password: document.getElementById("swal-foto").value,
                                rol: document.getElementById("swal-desc").value
                            };
                            await putUsuarios(usuario.id, updatedData);
                            Swal.fire("Actualizado", "", "success");
                            renderizarUsuarios();
                        }
                    });
                });
        usuariosRegistrados.appendChild(div);
    });
}

renderizarAdmins();
renderizarUsuarios();
