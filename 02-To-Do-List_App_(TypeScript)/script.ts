const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskButton = document.getElementById("addTaskButton") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const filterInput = document.getElementById("filterInput") as HTMLInputElement;

function createTaskItem(taskText: string): void{
    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
}

function saveTasks(): void {
    const tasks: string[] = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push(li.textContent || "");
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        try {
            const tasks: string [] = JSON.parse(storedTasks);
            tasks.forEach((task: string) => {
                createTaskItem(task);
            });
        } catch (error) {
            console.error("Error parsing tasks from localStorage: ", error);
        }
    }
}

function filterTasks(): void{
    const filterText = filterInput.value.toLowerCase();
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach((task) => {
        const taskText = (task.textContent || "").toLowerCase();
        task.style.display = taskText.indexOf(filterText) !== -1 ? "" : "none";
    });
}

loadTasks();

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskItem(taskText);
        taskInput.value = "";
        saveTasks();
        filterTasks();
    }
});

filterInput.addEventListener("input", filterTasks);