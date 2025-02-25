var taskInput = document.getElementById("taskInput");
var addTaskButton = document.getElementById("addTaskButton");
var taskList = document.getElementById("taskList");
var filterInput = document.getElementById("filterInput");
function createTaskItem(taskText) {
    var li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
}
function saveTasks() {
    var tasks = [];
    taskList.querySelectorAll("li").forEach(function (li) {
        tasks.push(li.textContent || "");
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        try {
            var tasks = JSON.parse(storedTasks);
            tasks.forEach(function (task) {
                createTaskItem(task);
            });
        }
        catch (error) {
            console.error("Error parsing tasks from localStorage: ", error);
        }
    }
}
function filterTasks() {
    var filterText = filterInput.value.toLowerCase();
    var tasks = taskList.querySelectorAll("li");
    tasks.forEach(function (task) {
        var taskText = (task.textContent || "").toLowerCase();
        task.style.display = taskText.indexOf(filterText) !== -1 ? "" : "none";
    });
}
loadTasks();
addTaskButton.addEventListener("click", function () {
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskItem(taskText);
        taskInput.value = "";
        saveTasks();
        filterTasks();
    }
});
filterInput.addEventListener("input", filterTasks);
