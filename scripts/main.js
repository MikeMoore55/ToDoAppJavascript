
/* ---- variables ---- */


//modal
const modal = document.querySelector("#form");
const taskInput = document.querySelector("#text-input");
const dateInput = document.querySelector("#date-input");
const taskDescription = document.querySelector("#text-area");
const taskMsg = document.querySelector("#task-msg");
const dateMsg = document.querySelector("#date-msg");
const descriptionMsg = document.querySelector("#description-msg");
const add = document.querySelector("#add");

//task list area
const taskList = document.querySelector("#task-list");

//pop up messages
const addedMessage = document.querySelector("#add-message")
const delMessage = document.querySelector("#del-message")
const editMessage = document.querySelector("#edit-message")

//sort btn
const sortBtn = document.querySelector("#sort-btn")



/* ---- functions ---- */


//pop up messages

//could have used switch statements dont know why i didn't think of it at first
const displayAddMessage = () => {
  addedMessage.style.display = "block";
};

const hideAddMessage = () => {
  addedMessage.style.display = "none";
};

const displayDelMessage = () => {
  delMessage.style.display = "block";
};

const hideDelMessage = () => {
  delMessage.style.display = "none";
};

const displayEditMessage = () => {
  editMessage.style.display = "block";
};

const hideEditMessage = () => {
  editMessage.style.display = "none";
};




//form validation
//when input fields are black, error messages must pop up

const formValidation = () => {

  // if task input field is blank then...

  if (taskInput.value === "") {
    console.log("failure");

    //form messages
    taskMsg.innerHTML = "**Task Field cannot be blank!**";
    dateMsg.innerHTML = "**Optional!**";
    descriptionMsg.innerHTML = "**Optional!**";
  } else {
    console.log("success");

    //form messages
    taskMsg.innerHTML = "";
    dateMsg.innerHTML = "";
    descriptionMsg.innerHTML = "";

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
  taskList.innerHTML = "";
  task.map((x, y) => {
    return (taskList.innerHTML += `
    <div id=${y}>
          <p class="task-text taskName">${x.text}</p>
          <p class="task-text taskDate">${x.date}</p>
          <p class="task-text taskDes">${x.description}</p>
  
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


//check through task when completed

//...not working...
/* const checkTask = () => {
  let newTaskName = document.querySelector(".taskName");
  let newTaskDate = document.querySelector(".taskDate");
  let newTaskDes = document.querySelector(".taskDes");

  newTaskName.classList.toggle("completed");
  newTaskDate.classList.toggle("completed");
  newTaskDes.classList.toggle("completed");
} */


//delete tasks

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  task.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("tasks", JSON.stringify(task));
  console.log(task);

  displayDelMessage();
  
};


//edit tasks

const editTask = (e) => {
// this creates a new task and saves the new value then deletes the old task

  let selectedTask = e.parentElement.parentElement;

  taskInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  taskDescription.value = selectedTask.children[2].innerHTML;

  deleteTask(e);

  //pop up messages
  hideDelMessage();
  hideAddMessage();
  displayEditMessage();
};


//reset form to default

const resetForm = () => {
  taskInput.value = "";
  dateInput.value = "";
  taskDescription.value = "";
};


//sort task a-z

const sortTask = () => {
  task.sort((a, b) => a.text.localeCompare(b.text));
  createTasks();
};



/* ---- Event Listeners ---- */

//event listener for sort a-z
sortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sortTask();
});

// event listeners to cancel pop up messages
addedMessage.addEventListener("click", (e) => {
  e.preventDefault();
  hideAddMessage();
});

delMessage.addEventListener("click", (e) => {
  e.preventDefault()
  hideDelMessage()
})

editMessage.addEventListener("click", (e) => {
  e.preventDefault();
  hideEditMessage();
});


//error message pop up
modal.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  displayAddMessage();
});



/* ---- local storage ---- */
(() => {
  task = JSON.parse(localStorage.getItem("tasks")) || []
  console.log(task);
  
  createTasks();
  //to load task if list is sorted
  sortTask();
})();
