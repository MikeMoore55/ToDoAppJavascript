
//when page loads, get all tasks remaining from local storage
window.onload = loadTasks;

//prevent the task input form from "freaking out"
document.querySelector("form").addEventListener("submit", e => {
e.preventDefault();
addTask();
});

//display form when "create task" button is clicked
function displayModal(){
    const modal = document.querySelector("#modal")
    modal.style.display = "block"
}

function hideModal(){
    const modal = document.querySelector("#modal")
    modal.style.display = "none"
}

function loadTasks() {
    // check if localStorage has any tasks
    // if not then return
    if (localStorage.getItem("tasks") == null) return;

    // Get the tasks from localStorage and convert it to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
      const list = document.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
    });
}

//add task to list
function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector("#myUl");
    // return if task is empty
    if (task.value === "") {
      document.getElementById("taskMessage").innerHTML ="Please add a task so we can add it to you list!"
        /* or do this... alert("This is a to do list, so please add some task!"); */
      return false;
    }
    // check is task already exist
    if (document.querySelector(`input[value="${task.value}"]`)) {
      alert("Task already exist!");
      return false;
    }

    // add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    document.getElementById("taskMessage").innerHTML =""
    // clears input field
    task.value = "";
}

//checked completed tasks
function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }

    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // check if task is empty
    if (event.value === "") {
      alert("Task is empty!");
      event.value = currentTask;
      return;
    }
    // task already exist
    tasks.forEach(task => {
      if (task.task === event.value) {
        alert("Task already exist!");
        event.value = currentTask;
        return;
      }
    });
    // update task
    tasks.forEach(task => {
      if (task.task === currentTask) {
        task.task = event.value;
      }
    });
    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}