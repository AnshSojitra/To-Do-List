const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }

    createTask(taskText);

    saveTasks();

    taskInput.value = "";
}

function createTask(text, completed = false){

    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span");
    span.textContent = text;

    if(completed){
        span.classList.add("completed");
    }

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
        const updatedText = prompt("Edit your task:", span.textContent);

        if (updatedText === null) {
            return;
        }

        const trimmedText = updatedText.trim();

        if (trimmedText === "") {
            alert("Task cannot be empty!");
            return;
        }

        span.textContent = trimmedText;
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTasks(){

    const tasks = [];

    document.querySelectorAll(".task").forEach(task => {

        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span")
                .classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

    const savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});