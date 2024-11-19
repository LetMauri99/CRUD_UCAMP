document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("create-form");
    const itemsTableBody = document.querySelector("#items-table tbody");

    // Evento para manejar la creación de elementos
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = document.getElementById("item-name").value.trim();
        if (itemName) {
            addItem(itemName);
            document.getElementById("item-name").value = ""; // Limpiar input
        }
    });

    // Función para agregar un elemento a la tabla (UI)
    const addItem = (name) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${Date.now()}</td>
            <td>${name}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        itemsTableBody.appendChild(row);
    };
});
