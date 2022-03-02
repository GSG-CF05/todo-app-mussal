// * Declaring the variables that will hold the existed elements.
let form = document.querySelector("form");
let inputBox = document.getElementById("input");
let submitBtn = document.getElementsByTagName("input")[1];
let tasksDiv = document.getElementsByClassName("tasks-container")[0];

// * Preventing the default behavior of the form.
submitBtn.onclick = function (e) {
  e.preventDefault();
};

// * When the user will type anything except spaces, the class 'active' will be passed to the submit button.
inputBox.onkeyup = (e) => {
  if (inputBox.value.trim() !== "") {
    submitBtn.classList.add("active");
  } else {
    submitBtn.classList.remove("active");
  }
};

// * Checking if the local storage has data for 'task' key or not.

let tasksArray = [];
if (localStorage.getItem("task")) {
  tasksArray = JSON.parse(localStorage.getItem("task"));
}

// * Calling the function to
getDataFromLocalStorage();

// * Creating the event listener for the submit button.
submitBtn.addEventListener("click", (e) => {
  addTaskToArray(inputBox.value);
  addElementsToPage(tasksArray);
  addTasksToLocalStorage(tasksArray);
  inputBox.value = "";
});

// * The function that is responsible for adding teh tasks data in the array.
function addTaskToArray(taskText) {
  let taskData = {
    id: Math.floor(Math.random() * 100), // ? We can also generate a unique number by Data.now() function.
    text: taskText,
    isCompleted: false,
  };
  tasksArray.push(taskData);
}

// * The function that responsible for adding the elements to the page.
function addElementsToPage(tasksArray) {
  // * if we add the elements in each update, there will be duplication in some tasks, so we empty the container.
  tasksDiv.innerHTML = "";
  // * Looping on the array to create elements for each task.
  tasksArray.forEach((element) => {
    let taskCont = document.createElement("div");
    taskCont.className = "task";
    let textSpan = document.createElement("span");
    textSpan.className = "text";
    textSpan.textContent = element.text; // ? textSpan.appendChild(document.createTextNode(element.text));
    let doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.type = "button";
    doneBtn.textContent = "Done";
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

    tasksDiv.appendChild(taskCont);
    taskCont.appendChild(textSpan);
    taskCont.appendChild(doneBtn);
    taskCont.appendChild(deleteBtn);
  });
}

// * The function that responsible for adding the elements to local storage.
function addTasksToLocalStorage(tasksArray) {
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}

// * The function that responsible for getting the data from local storage.
function getDataFromLocalStorage() {
  let tasksFromLS = window.localStorage.getItem("task");
  if (tasksFromLS) {
    let tasks = JSON.parse(tasksFromLS);
    // Now we need to re-add the elements to the page.
    addElementsToPage(tasks);
    /*
    I faced an error here that says: index.js:54 Uncaught 
    TypeError: Cannot read properties of null (reading 'forEach'). The solution was to declare another variable
    to parse the first and push it ot the page, and by doing so, we make sure that the array isn't empty.
    */
  }
}
