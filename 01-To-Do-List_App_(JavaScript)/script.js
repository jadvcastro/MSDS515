console.log("script.js is loaded" );

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

//Helper function for creating a new list item
function createTaskItem(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li)
}

//Save the current tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Load tasks from localStorage when the page loads
function loadTasks() {
    console.log("Fetching from local storage...");
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        try {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskItem(task);
            });
        } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
        }
    }
}

//Load tasks on page 
loadTasks();

//Event listener for addTaskButton
addTaskButton.addEventListener("click", () => {
    //Get the trimmed task text from the input field
    console.log("Button clicked")
    const taskText = taskInput.value.trim();

    //Only add non-empty tasks
    if (taskText !== "") {
        //Create a new list item 
        createTaskItem(taskText);

        //Clear input field
        taskInput.value = "";

        //Save tasks to localStorage
        saveTasks();
    }
});