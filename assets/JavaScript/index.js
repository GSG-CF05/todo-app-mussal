// * Declaring the variables that will hold the existed elements.
let form = document.querySelector("form");
let inputBox = document.getElementById("input");
let inputBtn = document.getElementsByTagName("input")[1];
let tasksDiv = document.getElementsByClassName("tasks-container")[0];

// * Preventing the default behavior of the form.
inputBtn.onclick = function (e) {
  e.preventDefault();
};

// * When the user will type anything except spaces, the class 'active' will be passed to the submit button.
inputBox.onkeyup = (e) => {
  if (inputBox.value.trim() !== "") {
    inputBtn.classList.add("active");
  } else {
    inputBtn.classList.remove("active");
  }
};

// * Checking if the local storage has data for 'task' key or not.
let tasksArray;
if (localStorage.getItem("task")) {
  tasksArray = JSON.parse(localStorage.getItem("task"));
} else {
  tasksArray = [];
}

// * The function that is responsible for adding teh tasks data in the array.
function addTaskToArray(taskText) {
  let taskData = {
    id: Math.floor(Math.random() * 100), // ? We can also generate a unique number by Data.now() function.
    text: taskText,
    isCompleted: false,
  };
  tasksArray.push(taskData);
}
