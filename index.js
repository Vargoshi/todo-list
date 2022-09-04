const list = document.getElementById("todo-list");
const input = document.getElementById("input");
const todoForm = document.getElementById("todo-form");
const addButton = document.getElementById("add_button");
const clearButton = document.getElementById("clear_button");
const todoCountElem = document.getElementById("todo-count");

let todos = [
    { date: new Date("2022-09-04T12:22:12Z"), text: "Learn React", done: true, author: "Nikita" },
    { date: new Date("2022-09-04T13:32:12Z"), text: "Learn Redux", done: false, author: "Nikita" },
    { date: new Date("2022-09-04T14:25:12Z"), text: "Learn React-Redux", done: false, author: "Nikita" },
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
        listElement.className = todo.done ? "todo-done" : "";

        // render checkbox
        {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.done;
            checkbox.addEventListener("input", (event) => {
                todo.done = checkbox.checked;
                render();
            });
            listElement.appendChild(checkbox);
        }

        const textContainer = document.createElement("div");
        textContainer.className = "todo-text-container";
        // render text
        {
            const span = document.createElement("span");
            span.textContent = todo.text;
            span.className = "todo-text";
            textContainer.appendChild(span);
        }
        // render metadata
        {
            const metadataContainer = document.createElement("div");
            metadataContainer.className = "todo-metadata";
            {
                const span = document.createElement("span");
                span.textContent = "at " + todo.date.toLocaleDateString();
                span.className = "todo-date";
                metadataContainer.appendChild(span);
            }

            {
                const span = document.createElement("span");
                span.textContent = "by " + todo.author;
                span.className = "todo-author";
                metadataContainer.appendChild(span);
            }
            textContainer.appendChild(metadataContainer);
        }
        listElement.appendChild(textContainer);

        // render delete button
        if (todo.done) {
            const removeButton = document.createElement("button");

            removeButton.addEventListener("click", (event) => {
                const todoIdx = todos.indexOf(todo);
                todos.splice(todoIdx, 1);
                render();
            });

            removeButton.textContent = "X";

            listElement.appendChild(removeButton);
        }

        list.appendChild(listElement);
    }
}

function renderCount() {
    const todoCount = todos.filter((todo) => !todo.done).length;
    todoCountElem.textContent = `${todoCount}`;
}

render();

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    todos.push({
        date: new Date(),
        text: input.value,
        done: false,
        author: "Vargoshi"
    });
    event.target.reset();
    render();
    
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