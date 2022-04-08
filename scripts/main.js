
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


//add task to list
function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");
    // return if task is empty
    if (task.value === "") {
      document.getElementById("taskMessage").innerHTML ="Please add a task so we can add it to you list!"
        /* alert("This is a to do list, so please add some task!"); */
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
    // clear input
    task.value = "";
  }