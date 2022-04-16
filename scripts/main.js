/* ---- variables ---- */

const modal = document.querySelector("#form");
const taskInput = document.querySelector("#textInput");
const dateInput = document.querySelector("#dateInput");
const taskDescription = document.querySelector("#textarea");
const msg = document.querySelector("#msg");
const tasks = document.querySelector("#tasks");
const add = document.querySelector("#add");

/* ---- event listener ---- */

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

/* ---- form validation ---- */

const formValidation = () => {
  // if task input field is blank then...
  if (taskInput.value === "") {
    console.log("failure");
    msg.innerHTML = "**Task cannot be blank**";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptTask();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// create empty array for task
// task = object within an array

let task = [{}];

/* ---- functions ---- */


// set tasks value within the array with certain fields

const acceptTask = () => {
  task.push({
    text: taskInput.value,//task name
    date: dateInput.value,// task due date
    description: taskDescription.value,// task description
  });

// create local storage item with key = tasks

  localStorage.setItem("tasks", JSON.stringify(task));

  console.log(task);
  createTasks();
};


// creates a task and displays it

const createTasks = () => {
  tasks.innerHTML = "";
  task.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });
//when task is added reset the form to default values

  resetForm();
};


//delete tasks

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  task.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("tasks", JSON.stringify(task));
  console.log(task);
  
};


//edit tasks

// this creates a new task and saves the new value then deletes the old one
const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  taskInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  taskDescription.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};


//reset form to default

const resetForm = () => {
  taskInput.value = "";
  dateInput.value = "";
  taskDescription.value = "";
};


/* ---- local storage ---- */
(() => {
  task = JSON.parse(localStorage.getItem("tasks")) || []
  console.log(task);
  createTasks();
})();
