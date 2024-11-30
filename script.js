document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("create-form");
    const booksTableBody = document.querySelector("#books-table tbody");
    const loadBooks = () => {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach((book) => addBookToTable(book));
    };
    const saveBooks = (books) => {
        localStorage.setItem("books", JSON.stringify(books));
    };
    const addBook = (book) => {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        saveBooks(books);
        addBookToTable(book);
    };
    const addBookToTable = (book) => {
        const row = document.createElement("tr");
        row.dataset.id = book.id;
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.description}</td>
            <td>${book.location}</td>
            <td>${book.status}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        booksTableBody.appendChild(row);
    };
    const deleteBook = (id) => {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter((book) => book.id !== id);
        saveBooks(books);
        document.querySelector(`tr[data-id='${id}']`).remove();
    };

    let editingBook = null;
    const editBook = (id) => {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const book = books.find((book) => book.id === id);
        if (book) {
            editingBook = book; 
            createForm.querySelector("#book-title").value = book.title;
            createForm.querySelector("#book-description").value = book.description;
            createForm.querySelector("#book-location").value = book.location;
            createForm.querySelector("#book-status").value = book.status;
            const registerButton = createForm.querySelector("button[type='submit']"); 
            registerButton.style.display = "none";

            const updateButton = document.createElement("button");
            updateButton.type = "submit";
            updateButton.id = "update-btn";
            updateButton.textContent = "Actualizar";
            createForm.appendChild(updateButton);
            const cancelButton = document.createElement("button");
            cancelButton.type = "button";
            cancelButton.id = "cancel-btn";
            cancelButton.textContent = "Cancelar";
            createForm.appendChild(cancelButton);
            cancelButton.onclick = () => {
                createForm.reset();
                registerButton.style.display = "block";
                updateButton.remove();
                cancelButton.remove();
                editingBook = null;
            };
        }
    };
    booksTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = Number(e.target.closest("tr").dataset.id);
            deleteBook(id);
        } else if (e.target.classList.contains("edit-btn")) {
            const id = Number(e.target.closest("tr").dataset.id);
            editBook(id);
        }
    });
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const books = JSON.parse(localStorage.getItem("books")) || []; 

        if (editingBook) { 
            editingBook.title = createForm.querySelector("#book-title").value.trim();
            editingBook.description = createForm.querySelector("#book-description").value.trim();
            editingBook.location = createForm.querySelector("#book-location").value.trim();
            editingBook.status = createForm.querySelector("#book-status").value;
            const bookIndex = books.findIndex((book) => book.id === editingBook.id);
            if (bookIndex !== -1) {
                books[bookIndex] = editingBook;
            }
            saveBooks(books);
            createForm.reset();
            const registerButton = createForm.querySelector("button[type='submit']");
            registerButton.style.display = "block"; 
            document.getElementById("update-btn").remove();
            document.getElementById("cancel-btn").remove();
            editingBook = null; 

            
            booksTableBody.innerHTML = ""; 
            loadBooks(); 

        } else {
            const book = {
                id: Date.now(),
                title: createForm.querySelector("#book-title").value.trim(),
                description: createForm.querySelector("#book-description").value.trim(),
                location: createForm.querySelector("#book-location").value.trim(),
                status: createForm.querySelector("#book-status").value,
            };

            if (book.title && book.description && book.location && book.status) {
                addBook(book);
                createForm.reset();
            }
        }
    });
    loadBooks();
});