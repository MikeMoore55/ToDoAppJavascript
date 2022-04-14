/*
 ____the naming conventions used____
    -camelCase = for normal variable and function declaration
    -SCREAMING_SNAKE_CASE = for global variable and function declaration
 */

//when page loads, get all tasks remaining from local storage
window.onload = loadTasks;

//prevent the task input form from "freaking out"
document.querySelector("form").addEventListener("submit", e => {
e.preventDefault();
addTask();
});


// ----- modal ----- //

const MODAL = document.querySelector("#modal")
const MODAL_BTN = document.querySelector("#modalBtn")
const CANCEL_BTN = document.querySelector("#cancelBtn")

const displayModal = () => {
  MODAL.style.display = "block"
}

const hideModal = () => {
  MODAL.style.display = "none"
}

MODAL_BTN.addEventListener('click', displayModal)
CANCEL_BTN.addEventListener('click', hideModal)


// Get the tasks from localStorage and convert it to an array
const TASKS = Array.from(JSON.parse(localStorage.getItem("tasks")));

// ----- load tasks ----- //

function loadTasks() {
    // check if localStorage has any tasks

    // if not then return
    if (localStorage.getItem("tasks") == null) return;

    // Loop through the tasks and add them to the list
    TASKS.forEach(task => {
      const list = document.querySelector("#toDoList");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <button class="editBtnContainer" onclick="editTask(event)">edit</button>
        <button class="delBtnContainer" onclick="removeTask(this)"> <img src=".//media/iconmonstr-x-mark-7-240.png" alt="delete img" class="delBtnImg" > </button>`;
      list.insertBefore(li, list.children[0]);
  });
}

// ----- add tasks ----- //

function addTask() {
    const task = document.querySelector("#taskInput");
    const list = document.querySelector("#toDoList");
    
    // return if task is empty
    if (task.value === "") {
      document.getElementById("formMessage").innerHTML ="Please add a task!"
      return false;
    }
    
    // check is task already exist
    if (document.querySelector(`input[value="${task.value}"]`)) {
      document.getElementById("formMessage").innerHTML = "This task exists!"
      return false;
    }
    
    else{
      document.getElementById("formMessage").innerHTML = ""
    }

    // add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <button id="edit" class="editBtnContainer" onclick="editTask(event)" >edit</button>
    <button class="delBtnContainer" onclick="removeTask(this)"><img src=".//media/iconmonstr-x-mark-7-240.png" alt="delete img" class="delBtnImg" > </button>`;
    list.appendChild(li)
    document.getElementById("formMessage").innerHTML =""
    
    // clears input field
    task.value = "";
}


// ----- complete tasks ----- //

function taskComplete(event) {
  TASKS.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(TASKS));
    event.nextElementSibling.classList.toggle("completed");
}


// ----- remove tasks ----- //
function removeTask(event) {
  TASKS.forEach(task => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        TASKS.splice(TASKS.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(TASKS));
    event.parentElement.remove();
}

// store current task to track changes
let currentTask = null;

// get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

// ----- edit tasks ----- //

function editTask(event){
  document.querySelector("#edit").addEventListener("click", displayModal)
  document.querySelector("#edit").addEventListener("click", removeTask(this))
}



/* function editTask(event) {    
    // check if task is empty
    if (event.value === "") {
      document.getElementById("errorMessage").innerHTML = "The task is empty"
      event.value = currentTask;
      return;
    }

    else
    {
      document.getElementById("errorMessage").innerHTML = ""
    }

    // if task already exist
    TASKS.forEach(task => {
      if (task.task === event.value) {
      document.getElementById("errorMessage").innerHTML = "The task already exist!";
        event.value = currentTask;
        return;
      }

      else{
      document.getElementById("errorMessage").innerHTML = "";
      }

    });
    
    // ----- update task ----- //
    TASKS.forEach(task => {
      if (task.task === currentTask) {
        task.task = event.value;
      }
      
    });

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(TASKS));
} */
