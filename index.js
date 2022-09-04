const list = document.getElementById("todo-list");
const input = document.getElementById("input");
const addButton = document.getElementById("add_button");
const clearButton = document.getElementById("clear_button");
const todoCountElem = document.getElementById("todo-count");

let todos = [
    { text: "Learn React", done: true },
    { text: "Learn Redux", done: false },
    { text: "Learn React-Redux", done: false },
];

function render() {
    list.innerHTML = "";
    todoCountElem.textContent = "";
    renderList();
    renderCount();
}

function renderList() {
    for (const todo of todos) {
        const listElement = document.createElement("li");
        listElement.style.textDecoration = todo.done ? "line-through" : "";

        // render checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        checkbox.addEventListener("input", (event) => {
            todo.done = checkbox.checked;
            render();
        });
        listElement.appendChild(checkbox);

        // render text
        listElement.appendChild(document.createTextNode(todo.text + " "));

        // render delete button
        if (todo.done) {
            const removeButton = document.createElement("button");

            removeButton.addEventListener("click", (event) => {
                const todoIdx = todos.indexOf(todo);
                todos.splice(todoIdx, 1);
                render();
            });

            removeButton.textContent = "Remove";

            listElement.appendChild(removeButton);
        }

        list.appendChild(listElement);
    }
}

function renderCount() {
    const todoCount = todos.filter((todo) => !todo.done).length;
    todoCountElem.textContent = `${todoCount} TODOs remaining`;
}

render();

addButton.addEventListener("click", (event) => {
    todos.push({ text: input.value, done: false });
    render();
    input.value = "";
});

clearButton.addEventListener("click", (event) => {
    todos = todos.filter((todo) => !todo.done);
    render();
});

// TODO list
// - [x] Add new item [remove]
// - [x] Remove item [remove]
// - [ ] Save list to local storage
// - [ ] Load list from local storage

// [_________] [add] [clear done]

// X todos remaining